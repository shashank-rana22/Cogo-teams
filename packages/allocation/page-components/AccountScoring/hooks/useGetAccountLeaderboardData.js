import { useForm } from '@cogoport/forms';
import { isEmpty } from '@cogoport/utils';
import { useState, useMemo, useEffect, useCallback } from 'react';

import controls from '../configurations/get-leaderboard-filters-controls';

import useGetAccountDistributionGraph from './useGetAccountDistributionGraph';
import useGetEngagementScoringLeaderboard from './useGetEngagementScoringLeaderboard';

const useGetAccountLeaderboardData = () => {
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
		leaderboardList,
		setLeaderboardParams,
		paginationData,
		getNextPage,
	} = useGetEngagementScoringLeaderboard();

	const { control, watch, resetField, setValue } = useForm({
		defaultValues: {
			date: new Date(),
		},
	});

	const { organization, user_id: userId, date, service, warmth: accountWarmth, segment } = watch();

	const mutatedControls = controls.map((singleControl) => {
		let newControl = { ...singleControl };

		if (newControl.name === 'user_id' && service) {
			newControl = {
				...newControl,
				disabled: false,
			};
		}

		if (newControl.name === 'warmth' && bulkDeallocateFilter) {
			newControl = {
				...newControl,
				disabled: true,
			};
		}

		return newControl;
	});

	useEffect(() => {
		setGraphParams((pv) => ({
			...pv,
			created_at : date || undefined,
			service    : service || undefined,
			filters    : {
				service_id : organization || undefined,
				user_id    : userId || undefined,
				warmth     : accountWarmth || undefined,
				segment    : segment || undefined,
			},
		}));

		setLeaderboardParams((pv) => ({
			...pv,
			created_at : date || undefined,
			service    : service || undefined,
			filters    : {
				service_id : organization || undefined,
				user_id    : userId || undefined,
				warmth     : accountWarmth || undefined,
				segment    : segment || undefined,
			},
		}));
	}, [organization, userId, date, service, accountWarmth, segment, setGraphParams, setLeaderboardParams]);

	const currentPageListIds = useMemo(() => leaderboardList.map(({ user_id }) => user_id), [leaderboardList]);

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
	};
};

export default useGetAccountLeaderboardData;
