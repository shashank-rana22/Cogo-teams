import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { useCallback, useEffect, useState } from 'react';

const useGetSpotSearch = () => {
	const { general: { query = {} } } = useSelector((state) => state);
	const { spot_search_id = '', rate_card_id } = query;

	const [screen, setScreen] = useState(rate_card_id ? 'selectedCard' : 'listRateCard');
	const [selectedCard, setSelectedCard] = useState({});
	const [filters, setFilters] = useState({
		page             : 1,
		departure_before : undefined,
		departure_after  : undefined,
	});

	const [{ loading, data }, trigger] = useRequest({
		method : 'GET',
		url    : '/list_spot_search_rate_cards',
	}, { manual: true });

	const getSearch = useCallback(async () => {
		if (!spot_search_id) return;

		let finalFilters = {};

		Object.keys(filters).forEach((key) => {
			if (key === 'page') return;

			finalFilters = {
				...finalFilters,
				[key]: filters[key] || undefined,
			};
		});

		try {
			await trigger({
				params: {
					spot_search_id,
					page       : filters.page,
					page_limit : 10,
					filters    : { ...finalFilters, status: 'active' },
				},
			});
		} catch (error) {
			if (error?.response?.data) {
				Toast.error(getApiErrorString(error.response?.data));
			}
		}
	}, [filters, spot_search_id, trigger]);

	useEffect(() => {
		getSearch();
	}, [getSearch, filters]);

	useEffect(() => {
		setScreen(rate_card_id ? 'selectedCardScreen' : 'listRateCard');
	}, [rate_card_id]);

	const refetch = async ({ screenObj = {} } = {}) => {
		try {
			const res = await trigger({
				params: {
					spot_search_id,
					page       : filters.page,
					page_limit : 100,
					filters    : {
						...filters.reduce((obj, key) => ({ ...obj, [key]: filters[key] || undefined }), {}),
					},
				},
			});

			setScreen(screenObj?.screen || 'listRateCard');

			if (screenObj?.screen === 'selectedCard') {
				setSelectedCard(res.data.list.filter(
					(item) => item.id === screenObj?.card_id,
				)?.[GLOBAL_CONSTANTS.zeroth_index]);
			}
		} catch (error) {
			if (error?.response?.data) {
				Toast.error(getApiErrorString(error.response?.data));
			}
		}
	};

	return {
		refetchSearch: refetch,
		loading,
		data,
		setScreen,
		screen,
		setSelectedCard,
		selectedCard,
		filters,
		setFilters,
	};
};
export default useGetSpotSearch;
