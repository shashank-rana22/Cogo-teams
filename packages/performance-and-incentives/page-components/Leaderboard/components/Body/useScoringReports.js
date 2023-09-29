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

const { ADMIN_REPORT, AGENT_REPORT } = LEADERBOARD_REPORT_TYPE_CONSTANTS;

const getReportTypeFilter = ({ currLevel }) => {
	if (currLevel.report_type === ADMIN_REPORT || !isEmpty(currLevel.user)) {
		return undefined;
	}

	return currLevel.report_type;
};

const getUserRmIdsFilter = ({ currLevel, levelStack }) => {
	if (currLevel.isExpanded) {
		return [levelStack[GLOBAL_CONSTANTS.zeroth_index]?.user?.id, ...(currLevel.user_rm_ids || [])];
	}

	return [currLevel.user?.id, ...(currLevel.user_rm_ids || [])];
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

	const [{ data, loading }, trigger] = useAllocationRequest({
		url     : '/reports',
		method  : 'GET',
		authkey : 'get_agent_scoring_reports',
		params,
	}, { manual: true });

	const { list = [], current_user_report: currentUserData } = data || {};

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
		if (currLevel.report_type !== AGENT_REPORT || (currLevel.isExpanded && isEmpty(currLevel.user))) {
			setParams((previousParams) => ({
				...previousParams,
				is_expanded_view : (currLevel.isExpanded && isEmpty(currLevel.user)) ? true : undefined,
				filters          : {
					...(previousParams.filters || {}),
					report_view_type   : getReportViewType({ currLevel, isChannel }),
					office_location_id : currLevel.location_id || undefined,
					channel            : currLevel.channel || undefined,
					report_type        : getReportTypeFilter({ currLevel }),
					user_rm_ids        : getUserRmIdsFilter({ currLevel, levelStack }),
				},
			}));
		}
	}, [setParams, currLevel, levelStack, isChannel, incentive_leaderboard_viewtype]);

	useEffect(() => {
		setParams((previousParams) => ({
			...previousParams,
			filters: {
				...(previousParams.filters || {}),
				q                       : searchQuery || undefined,
				created_at_greater_than : dateRange?.startDate || undefined,
				created_at_less_than    : dateRange?.endDate || undefined,
				partner_id              : entity || undefined,
			},
		}));
	}, [searchQuery, dateRange, entity, setParams]);

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
		listRefetch : trigger,
	};
};

export default useScoringReports;
