import { useRequest } from '@cogoport/request';
import { useEffect, useState, useCallback, useMemo } from 'react';

import { formatPayloadForSubsidiaryServiceRateCards } from '../helpers/format-payload-service-rate-cards';
import toastApiError from '../utils/toastApiError';

const useGetSubsidiaryServiceRateCards = ({ item }) => {
	const [apiData, setApiData] = useState({});

	const { code, services, service_type } = item || {};

	const payload = useMemo(
		() => formatPayloadForSubsidiaryServiceRateCards({ code, services, service_type }),
		[code, services, service_type],
	);

	const [{ loading }, trigger] = useRequest({
		url    : '/get_subsidiary_service_rate_cards',
		method : 'GET',
		params : payload,
	});

	const getSubsidiaryServiceRateCards = useCallback(async () => {
		try {
			const res = await trigger();
			setApiData(res.data || {});
		} catch (err) {
			setApiData({});
			toastApiError(err);
		}
	}, [trigger]);

	useEffect(() => {
		getSubsidiaryServiceRateCards();
	}, [getSubsidiaryServiceRateCards]);

	return {
		loading,
		apiData,
	};
};
export default useGetSubsidiaryServiceRateCards;
