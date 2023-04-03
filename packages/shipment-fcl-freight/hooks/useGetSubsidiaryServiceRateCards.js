import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';
import { useEffect, useState, useCallback } from 'react';

import getApiErrorString from '../utils/getApiErrorString';

const useGetSubsidiaryServiceRateCards = ({ item }) => {
	const [apiData, setApiData] = useState({});

	const serviceType = item?.service_type.replace('_service', '');

	const addedService = (item.services || []).find(
		(service) => service.service_type === item.service_type,
	);
	const date = new Date();

	const [{ loading }, trigger] = useRequest({
		url    : '/get_subsidiary_service_rate_cards',
		params : {
			code                 : item.code,
			service_type         : serviceType,
			validity_end         : addedService?.schedule_arrival,
			validity_start       : date,
			location_id          : addedService?.location?.id,
			importer_exporter_id : addedService?.importer_exporter_id,
			origin_location_id:
			addedService?.origin_port_id
			|| addedService?.origin_port?.id
			|| addedService?.origin_location?.id
			|| addedService?.origin_airport?.id
			|| undefined,
			destination_location_id:
			addedService?.destination_port_id
			|| addedService?.destination_port?.id
			|| addedService?.destination_location?.id
			|| addedService?.destination_airport?.id,
			container_type : addedService?.container_type,
			container_size : addedService?.container_size,
			commodity      : addedService?.commodity,
			service_provider_id:
			addedService?.service_provider_id
			|| addedService?.service_provider?.id,
			trade_type: addedService?.trade_type,
		},

	});

	const getSubsidiaryServiceRateCards = useCallback(async () => {
		try {
			const res = await trigger();
			setApiData(res.data || {});
		} catch (err) {
			setApiData({});
			Toast.error(getApiErrorString(err));
		}
	}, [JSON.stringify(trigger)]);

	useEffect(() => {
		getSubsidiaryServiceRateCards();
	}, [getSubsidiaryServiceRateCards]);

	return {
		loading,
		apiData,
	};
};
export default useGetSubsidiaryServiceRateCards;
