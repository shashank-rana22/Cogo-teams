import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { useCallback, useEffect, useState } from 'react';

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

// const FILTER_MAPPING = {
// 	shipping_line_id     : paymentTerm,
// 	currency             : paymentTerm,
// 	operator_type        : paymentTerm,
// 	cargo_readiness_date : paymentTerm,
// 	rate_type            : paymentTerm,
// 	payment_terms        : paymentTerm,
// 	offers               : paymentTerm,
// };

// const filteredItem = ({ rateCard, filters }) => {
// 	const checkerArray = [];
// 	Object.keys(filters).forEach((key) => {
// 		checkerArray.push(FILTER_MAPPING[key]({ rateCard, key, filters }));
// 	});
// 	console.log('checkerArray', checkerArray);
// 	console.log('filters', filters);
// 	if (checkerArray.includes(false)) {
// 		return false;
// 	}
// 	return true;
// };

// const handleFilter = (list, filters = {}) => {
// 	const sorted_list = [];
// 	if (isEmpty(filters)) {
// 		return list;
// 	}
// 	list.forEach((rateCard) => {
// 		if (filteredItem({ rateCard, filters })) {
// 			sorted_list.push(rateCard);
// 		}
// 	});

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

const useGetSpotSearch = () => {
	const { general: { query = {} } } = useSelector((state) => state);
	const { spot_search_id = '', importer_exporter_id = '' } = query;

	const [{ loading:actualLoading = false, data }, trigger] = useRequest({
		method : 'GET',
		url    : '/get_spot_search',
	}, { manual: true });

	const [screen, setScreen] = useState('listRateCard');
	const [selectedCard, setSelectedCard] = useState({});

	const getSearch = useCallback(async ({ firstScreen = 'listRateCard' }) => {
		try {
			await trigger({
				params: {
					id     : spot_search_id,
					intent : 'discovery',
					importer_exporter_id,
				},
			});

			setScreen(firstScreen);
		} catch (error) {
			if (error?.response?.data) {
				Toast.error(getApiErrorString(error.response?.data));
			}
		}
	}, [importer_exporter_id, spot_search_id, trigger]);

	useEffect(() => {
		getSearch({ firstScreen: 'listRateCard' });
	}, []);

	const refetch = async ({ screenObj = {} }) => {
		const res = await trigger({
			params: {
				id     : spot_search_id,
				intent : 'discovery',
				importer_exporter_id,
			},
		});

		setScreen(screenObj.screen || 'listRateCard');

		if (screenObj.screen === 'selectedCard') {
			setSelectedCard(res.data.rates.filter((item) => item.card === screenObj?.card_id)?.[0]);
		}
	};

	return {
		refetchSearch: refetch,
		actualLoading,
		data,
		setScreen,
		screen,
		setSelectedCard,
		selectedCard,
	};
};
export default useGetSpotSearch;
