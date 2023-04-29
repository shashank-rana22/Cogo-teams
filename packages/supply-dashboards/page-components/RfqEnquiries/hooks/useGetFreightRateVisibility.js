import { useRequest } from '@cogoport/request';
import { useEffect } from 'react';

const useGetFreightRateVisibility = ({ requiredValues, serviceType, service }) => {
	const api = {
		fcl_freight          : 'get_fcl_freight_rate_visibility',
		ftl_freight          : 'get_ftl_freight_rate_visibility',
		air_freight          : 'get_air_freight_rate_visibility',
		ltl_freight          : 'get_ltl_freight_rate_visibility',
		lcl_freight          : 'get_lcl_freight_rate_visibility',
		fcl_customs          : 'get_fcl_customs_rate_visibility',
		lcl_customs          : 'get_lcl_customs_rate_visibility',
		air_customs          : 'get_air_customs_rate_visibility',
		haulage_freight      : 'get_haulage_freight_rate_visibility',
		domestic_air_freight : 'get_domestic_air_freight_rate_visibility',
		trailer_freight      : 'get_haulage_freight_rate_visibility',
	};

	let payload = {
		shipping_line_id: requiredValues?.shipping_line_id,

		service_provider_id:
        requiredValues?.service_provider_id,
		origin_port_id      : service?.data?.origin_port_id,
		origin_main_port_id : requiredValues?.origin_main_port_id || undefined,
		destination_main_port_id:
        requiredValues?.destination_main_port_id || undefined,
		destination_port_id : service?.data?.destination_port_id,
		container_size      : service?.data?.container_size,
		from_date           : requiredValues?.validity_start || undefined,
		to_date             : requiredValues?.validity_end || undefined,
		commodity           : service?.data?.commodity,
		container_type      : service?.data?.container_type,
	};
	if (serviceType === 'air_freight') {
		payload = {
			airline_id: service?.data?.airline_id,

			service_provider_id     : requiredValues?.service_provider_id,
			origin_location_id      : service?.data?.origin_airport_id,
			destination_location_id : service?.data?.destination_airport_id,
			from_date               : requiredValues?.validity_start || undefined,
			to_date                 : requiredValues?.validity_end || undefined,
		};
	} else if (['ftl_freight', 'ltl_freight'].includes(serviceType)) {
		payload = {
			service_provider_id: requiredValues?.service_provider_id,
			origin_location_id:
            requiredValues?.origin?.origin_value
				|| requiredValues?.origin,
			destination_location_id:
            requiredValues?.destination?.destination_value
				|| requiredValues?.destination,
			commodity: service?.data?.commodity || undefined,
		};
	} else if (
		['fcl_customs', 'air_customs', 'fcl_customs'].includes(serviceType)
	) {
		payload = {
			service_provider_id : requiredValues?.service_provider_id,
			location_id         : service?.data?.port_id,
			commodity           : service?.data?.commodity,
		};
	}
	const apiName = api[serviceType];

	const [{ data }, trigger] = useRequest({
		method : 'get',
		url    : `/${apiName}`,
	}, { manual: true });

	const getData = async () => {
		try {
			const res = await trigger({
				params: {
					...payload,
				},
			});
			return res;
		} catch (e) {
			// console.log(e);
		}
		return null;
	};

	useEffect(() => {
		if (
			[
				'fcl_customs',
				'lcl_customs',
				'air_customs',
				'haulage_freight',
				'trailer_freight',
			].includes(serviceType)
		) {
			if (
				requiredValues?.service_provider_id
			) {
				getData();
			}
		} else if (['fcl_freight', 'air_freight'].includes(serviceType)) {
			if (
				serviceType != null
				&& (requiredValues?.shipping_line_id
					|| requiredValues?.airline_id)
				&& (requiredValues?.validity_start)
				&& (requiredValues?.validity_end)
				&& (requiredValues?.service_provider_id)
			) {
				getData();
			}
		} else if (
			serviceType != null
			&& (requiredValues?.service_provider_id)
		) {
			getData();
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [JSON.stringify(payload)]);

	return {
		values: data,
		getData,
	};
};
export default useGetFreightRateVisibility;
