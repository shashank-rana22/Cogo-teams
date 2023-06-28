import { useForm } from '@cogoport/forms';
import { isEmpty } from '@cogoport/utils';
import { useState, useMemo, useEffect, useCallback } from 'react';

import controls from '../configurations/get-leaderboard-filters-controls';

import useGetAccountDistributionGraph from './useGetAccountDistributionGraph';
import useGetEngagementScoringLeaderboard from './useGetEngagementScoringLeaderboard';

const useGetAccountLeaderboardData = () => {
	const [checkedRowsId, setCheckedRowsId] = useState([]);
	const [isAllChecked, setIsAllChecked] = useState(false);

	console.log('checkedRowsId', checkedRowsId);

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

	const { control, watch, resetField } = useForm({
		defaultValues: {
			date: new Date(),
		},
	});

	const { organization, user_id, date, service, warmth, segment } = watch();

	const mutatedControls = controls.map((singleControl) => {
		let newControl = { ...singleControl };

		if (newControl.name === 'user_id' && service) {
			newControl = {
				...newControl,
				disabled: false,
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
				user_id    : user_id || undefined,
				warmth     : warmth || undefined,
				segment    : segment || undefined,
			},
		}));

		setLeaderboardParams((pv) => ({
			...pv,
			created_at : date || undefined,
			service    : service || undefined,
			filters    : {
				service_id : organization || undefined,
				user_id    : user_id || undefined,
				warmth     : warmth || undefined,
				segment    : segment || undefined,
			},
		}));
	}, [organization, user_id, date, service, warmth, segment, setGraphParams, setLeaderboardParams]);

	const currentPageListIds = useMemo(() => leaderboardList
		.filter(() => warmth === 'ice_cold' || warmth === 'cold')
		.map(() => user_id), [leaderboardList, warmth, user_id]);

	const selectAllHelper = useCallback((listArgument = []) => {
		const isRowsChecked = currentPageListIds.every((id) => listArgument?.includes(id));
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
	};
};

export default useGetAccountLeaderboardData;
