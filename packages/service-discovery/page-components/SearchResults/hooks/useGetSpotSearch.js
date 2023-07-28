import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { useCallback, useEffect, useState } from 'react';

const useGetSpotSearch = ({ setComparisonRates = () => {} }) => {
	const { general: { query = {} } } = useSelector((state) => state);
	const { spot_search_id = '', rate_card_id, checkout_id } = query;

	const [screen, setScreen] = useState(rate_card_id ? 'selectedCardScreen' : 'listRateCard');
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
			setComparisonRates({});
		} catch (error) {
			if (error?.response?.data) {
				Toast.error(getApiErrorString(error.response?.data));
			}
		}
	}, [filters, setComparisonRates, spot_search_id, trigger]);

	useEffect(() => {
		if (screen === 'comparison') return;
		getSearch();
	}, [getSearch, filters, screen]);

	useEffect(() => {
		if (checkout_id) return;

		setScreen(rate_card_id ? 'selectedCardScreen' : 'listRateCard');
	}, [rate_card_id, checkout_id]);

	return {
		refetchSearch: getSearch,
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
