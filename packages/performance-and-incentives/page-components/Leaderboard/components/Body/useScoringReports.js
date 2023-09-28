import { useDebounceQuery } from '@cogoport/forms';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { useAllocationRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { isEmpty } from '@cogoport/utils';
import { useState, useEffect, useCallback } from 'react';

import LEADERBOARD_REPORT_TYPE_CONSTANTS from '../../../../constants/leaderboard-reporttype-constants';
import LEADERBOARD_VIEWTYPE_CONSTANTS from '../../../../constants/leaderboard-viewtype-constants';
import getReportViewType from '../../helpers/getReportViewType';

const { ADMIN } = LEADERBOARD_VIEWTYPE_CONSTANTS;

const { ADMIN_REPORT } = LEADERBOARD_REPORT_TYPE_CONSTANTS;

const getReportTypeFilter = ({ currLevel }) => {
	if (currLevel.report_type === ADMIN_REPORT || !isEmpty(currLevel.user)) {
		return undefined;
	}

	return currLevel.report_type;
};

const getUserRmIdsFilter = ({ currLevel, incentive_leaderboard_viewtype }) => {
	if (incentive_leaderboard_viewtype === ADMIN) {
		return [currLevel.user?.id, ...(currLevel.user_rm_ids || [])];
	}

	return currLevel.user_rm_ids || [];
};

const useScoringReports = (props) => {
	const { currLevel, setCurrLevel, dateRange, entity, isChannel, levelStack, setLevelStack } = props;

	const { incentive_leaderboard_viewtype, user } = useSelector(({ profile }) => profile);

	const { debounceQuery, query: searchQuery } = useDebounceQuery();

	const [view] = incentive_leaderboard_viewtype.split('_');

	const [params, setParams] = useState({
		user_data_required      : true,
		role_data_required      : true,
		add_current_user_report : incentive_leaderboard_viewtype !== ADMIN,
		filters                 : {
			report_view_type        : getReportViewType({ currLevel, isChannel }),
			report_type             : incentive_leaderboard_viewtype !== ADMIN ? `${view}_report` : undefined,
			q                       : searchQuery || undefined,
			created_at_greater_than : dateRange?.startDate || undefined,
			created_at_less_than    : dateRange?.endDate || undefined,
			partner_id              : entity || undefined,
			current_user_id         : incentive_leaderboard_viewtype !== ADMIN ? user.id : undefined,
		},
	});

	const [{ data, loading }, trigger, refetch] = useAllocationRequest({
		url     : '/reports',
		method  : 'GET',
		authkey : 'get_agent_scoring_reports',
		params,
	}, { manual: true });

	const { list = [], current_user_report: currentUserData } = data || {};

	useEffect(() => {
		setParams((previousParams) => ({
			...previousParams,
			filters: {
				...(previousParams.filters || {}),
				q                       : searchQuery || undefined,
				created_at_greater_than : dateRange?.startDate || undefined,
				created_at_less_than    : dateRange?.endDate || undefined,
				partner_id              : entity || undefined,
				report_view_type        : getReportViewType({ currLevel, isChannel }),
				report_type             : getReportTypeFilter({ currLevel }),
				office_location_id      : currLevel.location_id || undefined,
				channel                 : currLevel.channel || undefined,
				user_rm_ids             : getUserRmIdsFilter({ currLevel, incentive_leaderboard_viewtype }),
			},
		}));
	}, [searchQuery, dateRange, entity, setParams, currLevel, isChannel, incentive_leaderboard_viewtype]);

	const fetchList = useCallback(async () => {
		try {
			trigger();
		} catch (err) {
			setCurrLevel(levelStack[GLOBAL_CONSTANTS.zeroth_index]);

			setLevelStack((prev) => {
				const curr = [...prev];
				curr.shift();

				return curr;
			});
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [setLevelStack, setCurrLevel, trigger]);

	useEffect(() => {
		fetchList();
	}, [params, fetchList]);

	return {
		list,
		listLoading : loading,
		currentUserData,
		params,
		setParams,
		debounceQuery,
		listRefetch : refetch,
	};
};

export default useScoringReports;
