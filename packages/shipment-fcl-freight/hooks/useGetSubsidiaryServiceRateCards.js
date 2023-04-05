import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';
import { useEffect, useState, useCallback } from 'react';

import { formatPayloadForSubsidiaryServiceRateCards } from '../helpers/format-payload-service-rate-cards';
import getApiErrorString from '../utils/getApiErrorString';

const useGetSubsidiaryServiceRateCards = ({ item }) => {
	const [apiData, setApiData] = useState({});

	const [{ loading }, trigger] = useRequest({
		url    : '/get_subsidiary_service_rate_cards',
		method : 'GET',
	});

	const { payload } = formatPayloadForSubsidiaryServiceRateCards(item);

	const getSubsidiaryServiceRateCards = useCallback(async () => {
		try {
			const res = await trigger({
				params: {
					...payload,
				},
			});
			setApiData(res.data || {});
		} catch (err) {
			setApiData({});
			Toast.error(getApiErrorString(err));
		}
	}, [trigger, payload]);

	useEffect(() => {
		getSubsidiaryServiceRateCards();
	}, [getSubsidiaryServiceRateCards]);

	return {
		loading,
		apiData,
	};
};
export default useGetSubsidiaryServiceRateCards;
