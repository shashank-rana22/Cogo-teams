import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { isEmpty } from '@cogoport/utils';
import { useCallback, useEffect, useState } from 'react';

import { paymentTerm } from '../utils/getHandleFilterFunction';

// import {
// 	basicFreightHighToLow,
// 	basicFreightLowToHigh,
// 	detentionFreeLimitHighToLow,
// 	detentionFreeLimitLowToHigh,
// 	transitTimeLowToHigh,
// 	transitTimeHighToLow,
// 	totalFreightHighToLow,
// 	totalFreightLowToHigh,
// } from '../utils/getHandleSortFunctions';

// const HANDLE_SORT_MAPPING = {
// 	basic_freight_low_to_high          : basicFreightLowToHigh,
// 	basic_freight_high_to_low          : basicFreightHighToLow,
// 	transit_time_low_to_high           : transitTimeLowToHigh,
// 	transit_time_high_to_low           : transitTimeHighToLow,
// 	detention_free_limit_low_to_high   : detentionFreeLimitLowToHigh,
// 	detention_free_limit_high_to_low   : detentionFreeLimitHighToLow,
// 	total_price_discounted_high_to_low : totalFreightHighToLow,
// 	total_price_discounted_low_to_high : totalFreightLowToHigh,
// };

const FILTER_MAPPING = {
	shipping_line_id     : paymentTerm,
	currency             : paymentTerm,
	operator_type        : paymentTerm,
	cargo_readiness_date : paymentTerm,
	rate_type            : paymentTerm,
	payment_terms        : paymentTerm,
	offers               : paymentTerm,
};

const filteredItem = ({ rateCard, filters }) => {
	const checkerArray = [];
	Object.keys(filters).forEach((key) => {
		checkerArray.push(FILTER_MAPPING[key]({ rateCard, key, filters }));
	});
	console.log('checkerArray', checkerArray);
	console.log('filters', filters);
	if (checkerArray.includes(false)) {
		return false;
	}
	return true;
};

const handleFilter = (list, filters = {}) => {
	const sorted_list = [];
	if (isEmpty(filters)) {
		return list;
	}
	list.forEach((rateCard) => {
		if (filteredItem({ rateCard, filters })) {
			sorted_list.push(rateCard);
		}
	});

	sorted_list.forEach(
		(item, index) => item.source === 'cogo_assured_rate'
			&& sorted_list.unshift(sorted_list.splice(index, 1)[0]),
	);

	return [
		...(sorted_list || []).filter(
			(item) => item?.source === 'spot_negotiation_rate',
		),
		...(sorted_list || []).filter(
			(item) => item?.source !== 'spot_negotiation_rate',
		),
	];
};

const useGetSpotSearch = () => {
	const { general: { query = {} } } = useSelector((state) => state);

	const [state, setState] = useState({
		details                      : {},
		services                     : ['freight'],
		offers                       : [],
		loading                      : true,
		headerData                   : {},
		// invoice                      : {},
		// views                        : 0,
		error                        : null,
		sort                         : 'basic_freight_low_to_high',
		filters                      : { shipping_line_id: '' },
		// lowestRate                   : {},
		currencyConversions          : {},
		rates                        : [],
		possible_subsidiary_services : [],
		ratesOriginalList            : [],
		shippingLineOptions          : [],
		searchData                   : {},
		priceRange                   : {},
	});

	const { spot_search_id = '', importer_exporter_id = '' } = query;

	const [{ loading:actualLoading = false }, trigger] = useRequest({
		method : 'GET',
		url    : '/get_spot_search',
	}, { manual: true });

	// const handleSort = (list, sortByKey = state.sort) => {
	// 	let sorted_list = list;

	// 	if (sortByKey in HANDLE_SORT_MAPPING) {
	// 		sorted_list = HANDLE_SORT_MAPPING[sortByKey]({ list });
	// 	}

	// 	sorted_list.forEach(
	// 		(item, index) => item.source === 'cogo_assured_rate'
	// 			&& sorted_list.unshift(sorted_list.splice(index, 1)[0]),
	// 	);

	// 	return [
	// 		...(sorted_list || []).filter(
	// 			(item) => item?.source === 'spot_negotiation_rate',
	// 		),
	// 		...(sorted_list || []).filter(
	// 			(item) => item?.source !== 'spot_negotiation_rate',
	// 		),
	// 	];
	// };

	const setFilters = (filters) => {
		const ratesOriginalList = [...state.ratesOriginalList];

		const filterObj = { ...state.filters, ...filters };

		Object.keys(filterObj).forEach((key) => {
			if (!filterObj[key]) {
				delete filterObj[key];
			}
		});

		console.log('Filters', state.filters);

		setState({
			...state,
			filters : filterObj,
			rates   : handleFilter(ratesOriginalList, filterObj),
		});
	};

	const createOptions = ({ ratesObject = [] }) => {
		const options = [];
		ratesObject.forEach((rateCard) => {
			options.push({
				label : rateCard?.shipping_line?.short_name,
				value : rateCard?.shipping_line?.id,
			});
		});
		return options;
	};

	const getResults = useCallback(async () => {
		try {
			const response = await trigger({
				params: {
					id     : spot_search_id,
					intent : 'discovery',
					importer_exporter_id,
				},
			});

			const data = response.data || {};

			const ratesObject = data.rates || {};

			// const packages = handleSort(ratesObject || []);
			const packages = ratesObject || [];

			const rates = !isEmpty(packages) ? packages : ratesObject;

			// const priceRange = priceMinMax({ ratesObject });

			const shippingLineOptions = createOptions({ ratesObject });

			setState((prev) => ({
				...prev,
				details           : data.detail || {},
				error             : null,
				rates,
				ratesOriginalList : ratesObject,
				filters           : { ...(prev.filters || {}), currency: rates?.[0]?.total_price_currency || 'USD' },
				possible_subsidiary_services:
							response?.data?.possible_subsidiary_services || [],
				// views               : data.views_count,
				services            : (data.detail || {}).services || [],
				// lowestRate          : ratesObject.lowest_rate || {},
				currencyConversions : data.currency_conversions || {},
				offers              : data.offers || [],
				// invoice             : data.invoice || {},
				loading             : false,
				headerData          : data.detail || {},
				sort                : prev.sort,
				searchData          : data,
				shippingLineOptions,
				// priceRange,
			}));
		} catch (error) {
			if (error?.response?.data) {
				Toast.error(getApiErrorString(error.response?.data));
			}
			setState((prev) => ({
				...prev,
				loading: false,
				error,
			}));
		}
	}, [importer_exporter_id, spot_search_id, trigger]);

	useEffect(() => {
		getResults();
	}, [getResults]);

	const refetch = (isSetLoading = false) => {
		setState((prevState) => ({
			...prevState,
			loading: isSetLoading ? true : prevState.loading,
		}));
		getResults();
	};

	// console.log('STATE', state);

	return {
		refetchSearch: refetch,
		actualLoading,
		state,
		...state,
		setState,
		setFilters,
	};
};
export default useGetSpotSearch;
