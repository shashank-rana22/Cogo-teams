import { useForm } from '@cogoport/forms';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { isEmpty } from '@cogoport/utils';
import { useTranslation } from 'next-i18next';
import { useState, useMemo, useEffect, useCallback } from 'react';

import getControls from '../configurations/get-leaderboard-filters-controls';
import getMutatedControls from '../utils/get-leaderboard-mutated-controls';

import useGetAccountDistributionGraph from './useGetAccountDistributionGraph';
import useGetEngagementScoringLeaderboard from './useGetEngagementScoringLeaderboard';

const useGetAccountLeaderboardData = () => {
	const { t } = useTranslation(['allocation']);

	const [checkedRowsId, setCheckedRowsId] = useState([]);
	const [isAllChecked, setIsAllChecked] = useState(false);
	const [bulkDeallocateFilter, setBulkDeallocateFilter] = useState(false);

	const {
		graphData,
		graphLoading,
		setGraphParams,
	} = useGetAccountDistributionGraph();

	const {
		leaderboardLoading,
		leaderboardList = [],
		setLeaderboardParams,
		paginationData,
		getNextPage,
		refetch,
	} = useGetEngagementScoringLeaderboard();

	const { control, watch, resetField, setValue } = useForm({
		defaultValues: {
			duration: 7,
		},
	});

	const controls = getControls({ t });

	const {
		organization, user_id: userId, date_range, service, warmth: accountWarmth, segment, duration, role_id,
	} = watch();

	const mutatedControls = getMutatedControls({ controls, service, bulkDeallocateFilter, duration, t });

	useEffect(() => {
		if (duration !== 'custom') {
			setValue('date_range', {
				startDate : new Date(Date.now() - (duration * GLOBAL_CONSTANTS.milliseconds_in_one_day)),
				endDate   : new Date(),
			});
		}
	}, [duration, setValue]);

	useEffect(() => {
		setGraphParams((pv) => ({
			...pv,
			from_date : date_range?.startDate || new Date(),
			to_date   : date_range?.endDate || new Date(),
			service   : service || undefined,
			filters   : {
				service_id     : organization || undefined,
				stakeholder_id : userId || undefined,
				warmth         : accountWarmth || undefined,
				segment        : segment || undefined,
				role_id        : role_id || undefined,
			},
		}));

		setLeaderboardParams((pv) => ({
			...pv,
			from_date : date_range?.startDate || new Date(),
			to_date   : date_range?.endDate || new Date(),
			service   : service || undefined,
			filters   : {
				service_id     : organization || undefined,
				stakeholder_id : userId || undefined,
				warmth         : accountWarmth || undefined,
				segment        : segment || undefined,
				role_id        : role_id || undefined,
			},
			page: 1,
		}));
	}, [organization, userId,
		service, accountWarmth, segment, setGraphParams, setLeaderboardParams, date_range, role_id]);

	const currentPageListIds = useMemo(() => leaderboardList
		?.map(({ service_user_id }) => service_user_id), [leaderboardList]);

	const selectAllHelper = useCallback((listArgument = []) => {
		const isRowsChecked = currentPageListIds.every((id) => listArgument.includes(id));
		if (isRowsChecked !== isAllChecked) {
			setIsAllChecked(isRowsChecked);
		}
	}, [currentPageListIds, isAllChecked]);

	useEffect(() => {
		if (isEmpty(currentPageListIds)) {
			return;
		}

		selectAllHelper(checkedRowsId);
	}, [currentPageListIds, selectAllHelper, checkedRowsId]);

	useEffect(() => {
		resetField('user_id');
	}, [service, resetField]);

	return {
		graphData,
		graphLoading,
		setGraphParams,
		leaderboardLoading,
		leaderboardList,
		setLeaderboardParams,
		paginationData,
		getNextPage,
		control,
		filterControls: mutatedControls,
		checkedRowsId,
		setCheckedRowsId,
		isAllChecked,
		setIsAllChecked,
		currentPageListIds,
		selectAllHelper,
		setValue,
		bulkDeallocateFilter,
		setBulkDeallocateFilter,
		refetch,
	};
};

export default useGetAccountLeaderboardData;
