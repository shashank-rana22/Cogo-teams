import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { useCallback, useEffect } from 'react';

const API_NAME = {
	fcl_freight : 'get_fcl_freight_rate',
	air_freight : 'get_air_freight_rate',
	fcl_customs : 'get_fcl_customs_rate',
	haulage     : 'get_haulage_freight_rate',
	lcl_freight : 'get_lcl_freight_rate',
	lcl_customs : 'get_lcl_customs_rate',
	trailer     : 'get_trailer_freight_rate',
	ltl_freight : 'get_ltl_freight_rate',
	ftl_freight : 'get_ftl_freight_rate',
	fcl_cfs     : 'get_fcl_cfs_rate',
};

const useGetFreightRate = ({ filter, formValues, cardData }) => {
	const endPoint = API_NAME[filter?.service];

	const { profile = {} } = useSelector((state) => state);
	const { partner = {} } = profile;
	const { id } = partner;
	const [{ loading, data }, trigger] = useRequest({
		url    : endPoint,
		method : 'GET',
	}, { manual: true });

	const getFreightRate = useCallback(async () => {
		const Params = {
			origin_port_id      : cardData?.origin_port_id,
			destination_port_id : cardData?.destination_port_id,
			shipping_line_id    : formValues?.shipping_line_id,
			service_provider_id : formValues?.service_provider_id,
			payment_term        : formValues?.payment_term,
			validity_end        : formValues?.validity_end,
			validity_start      : formValues?.validity_start,

		};
		const ftlparams = {
			service_provider_id     : formValues?.service_provider_id,
			destination_location_id : cardData?.destination_location_id,
			origin_location_id      : cardData?.origin_location_id,
			transit_time            : cardData?.transit_time,
		};
		const airParams = {
			origin_airport_id      : cardData?.origin_airport_id,
			destination_airport_id : cardData?.destination_airport_id,
			airline_id             : formValues?.airline_id,
			service_provider_id    : formValues?.service_provider_id,
		};

		const customsParams = {
			service_provider_id : formValues?.service_provider_id,
			location_id         : cardData?.location_id,
			trade_type          : 'import',
		};

		const paramsMapping = () => {
			if (['fcl_freight', 'lcl_freight', 'ltl_freight'].includes(filter?.service)) {
				return Params;
			}
			if (filter?.service === 'ftl_freight') {
				return ftlparams;
			}

			if (filter?.service === 'air_freight') {
				return airParams;
			}
			if (['fcl_customs', 'lcl_customs', 'air_customs'].includes(filter?.service)) {
				return customsParams;
			}
			return Params;
		};

		const paramsMappingResult = paramsMapping();

		try {
			await trigger({
				params: {
					id             : cardData?.id,
					commodity      : formValues?.commodity,
					container_size : formValues?.container_size,
					container_type : formValues?.container_type,
					cogo_entity_id : id || undefined,
					...paramsMappingResult,
				},
			});
		} catch (err) {
			// console.log(err);
		}
	}, [cardData?.destination_airport_id, cardData?.destination_location_id, cardData?.destination_port_id,
		cardData?.id, cardData?.location_id, cardData?.origin_airport_id, cardData?.origin_location_id,
		cardData?.origin_port_id, cardData?.transit_time, filter?.service, formValues?.airline_id,
		formValues?.commodity, formValues?.container_size, formValues?.container_type, formValues?.payment_term,
		formValues?.service_provider_id, formValues?.shipping_line_id, formValues?.validity_end,
		formValues?.validity_start, id, trigger]);

	useEffect(() => {
		getFreightRate();
	}, [getFreightRate]);

	return {
		data,
		loading,
	};
};

export default useGetFreightRate;
