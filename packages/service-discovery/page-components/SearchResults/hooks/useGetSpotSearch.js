import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { useCallback, useEffect, useState } from 'react';

const DEFAULT_PAGE = 1;
const ONE = 1;

const useGetSpotSearch = ({ setComparisonRates = () => {} }) => {
	const { general: { query = {} } } = useSelector((state) => state);
	const { spot_search_id = '', rate_card_id, checkout_id } = query;

	const [screen, setScreen] = useState(rate_card_id ? 'selectedCardScreen' : 'listRateCard');
	const [selectedCard, setSelectedCard] = useState({});
	const [page, setPage] = useState(DEFAULT_PAGE);
	const [filters, setFilters] = useState({
		departure_before : undefined,
		departure_after  : undefined,
	});
	const [rates, setRates] = useState([]);

	const [{ loading, data }, trigger] = useRequest({
		method : 'GET',
		url    : '/list_spot_search_rate_cards',
	}, { manual: true });

	const getSearch = useCallback(async ({ show_more = false } = {}) => {
		if (!spot_search_id || (page > ONE && !show_more)) return;

		let finalFilters = {};

		Object.keys(filters).forEach((key) => {
			finalFilters = {
				...finalFilters,
				[key]: filters[key] || undefined,
			};
		});

		try {
			const { data:rateData } = await trigger({
				params: {
					spot_search_id,
					page       : show_more ? page + ONE : page,
					page_limit : 10,
					filters    : { ...finalFilters, status: 'active' },
				},
			});

			if (show_more) {
				setPage((prev) => prev + ONE);
			}

			const { list = [] } = rateData;

			if (show_more) {
				setRates((prevRates) => ([...prevRates, ...list]));
			} else {
				setRates(list);
			}

			setComparisonRates({});
		} catch (error) {
			if (error?.response?.data) {
				Toast.error(getApiErrorString(error.response?.data));
			}
		}
	}, [filters, page, setComparisonRates, spot_search_id, trigger]);

	useEffect(() => {
		if (screen === 'comparison') return;
		getSearch();
	}, [getSearch, filters, screen]);

	useEffect(() => {
		if (checkout_id) return;

		setScreen(rate_card_id ? 'selectedCardScreen' : 'listRateCard');
	}, [rate_card_id, checkout_id]);

	useEffect(() => {
		setPage(DEFAULT_PAGE);
	}, [filters]);

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
		page,
		rates,
	};
};
export default useGetSpotSearch;
