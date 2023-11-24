import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { useCallback, useEffect } from 'react';

const API_NAME = {
	fcl_freight : 'get_fcl_freight_rate',
	air_customs : 'get_air_customs_rate',
	fcl_customs : 'get_fcl_customs_rate',
	haulage     : 'get_haulage_freight_rate',
	lcl_freight : 'get_lcl_freight_rate',
	lcl_customs : 'get_lcl_customs_rate',
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
			shipping_line_id    : formValues?.shipping_line_id || undefined,
			service_provider_id : formValues?.service_provider_id || formValues?.service_provider_id,
			payment_term        : formValues?.payment_term,
			validity_end        : formValues?.validity_end,
			validity_start      : formValues?.validity_start,

		};

		const customsParams = {
			service_provider_id : cardData?.service_provider_id || formValues?.service_provider_id,
			location_id         : cardData?.location_id || undefined,
			trade_type          : cardData?.trade_type || formValues?.trade_type,
			commodity           : cardData?.commodity || formValues?.commodity || undefined,
			airport_id          : cardData?.airport_id || undefined,
			rate_type           : cardData?.rate_type || formValues?.rate_type || 'market_place',
		};

		const haulageParams = {
			service_provider_id     : cardData?.service_provider_id || formValues?.service_provider_id,
			origin_location_id      : cardData?.origin_location_id,
			destination_location_id : cardData?.destination_location_id,
			haulage_type            : cardData?.haulage_type || formValues?.haulage_type,
			transport_modes         : cardData?.transport_modes || formValues?.transport_modes || ['rail'],
		};

		const fclCfsParams = {
			service_provider_id : cardData?.service_provider_id || formValues?.service_provider_id,
			location_id         : cardData?.location_id || undefined,
			trade_type          : cardData?.trade_type,
			cargo_handling_type : cardData?.cargo_handling_type || formValues?.cargo_handling_type,
		};

		const paramsMapping = () => {
			if (['fcl_freight', 'lcl_freight'].includes(filter?.service)) {
				return Params;
			}
			if (filter?.service === 'haulage') {
				return haulageParams;
			}
			if (filter?.service === 'fcl_cfs') {
				return fclCfsParams;
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
					commodity      : formValues?.commodity || cardData?.commodity,
					container_size : formValues?.container_size || cardData?.container_size,
					container_type : formValues?.container_type || cardData?.container_type,
					cogo_entity_id : id || undefined,
					...paramsMappingResult,
				},
			});
		} catch (err) {
			// console.log(err);
		}
	}, [cardData?.airport_id, cardData?.cargo_handling_type, cardData?.commodity, cardData?.container_size,
		cardData?.container_type, cardData?.destination_location_id, cardData?.destination_port_id,
		cardData?.haulage_type, cardData?.id, cardData?.location_id, cardData?.origin_location_id,
		cardData?.origin_port_id, cardData?.rate_type, cardData?.service_provider_id, cardData?.trade_type,
		cardData?.transport_modes, filter?.service, formValues?.cargo_handling_type, formValues?.commodity,
		formValues?.container_size, formValues?.container_type, formValues?.haulage_type,
		formValues?.payment_term, formValues?.rate_type, formValues?.service_provider_id,
		formValues?.shipping_line_id, formValues?.trade_type, formValues?.transport_modes,
		formValues?.validity_end, formValues?.validity_start, id, trigger]);

	useEffect(() => {
		getFreightRate();
	}, [getFreightRate]);

	return {
		data,
		loading,
	};
};

export default useGetFreightRate;
