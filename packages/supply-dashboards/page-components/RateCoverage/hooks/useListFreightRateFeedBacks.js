import { useRequest } from '@cogoport/request';
import { useCallback } from 'react';

const API = {
	fcl_freight       : 'list_fcl_freight_rate_feedbacks',
	air_freight       : 'list_air_freight_rate_feedbacks',
	fcl_customs       : 'list_fcl_customs_rate_feedbacks',
	haulage           : 'list_haulage_freight_rate_feedbacks',
	lcl_freight       : 'list_lcl_freight_rate_feedbacks',
	lcl_customs       : 'list_lcl_customs_rate_feedbacks',
	air_customs       : 'list_air_customs_rate_feedbacks',
	trailer           : 'list_trailer_freight_rate_feedbacks',
	ltl_freight       : 'list_ltl_freight_rate_feedbacks',
	ftl_freight       : 'list_ftl_freight_rate_feedbacks',
	fcl_cfs           : 'list_fcl_cfs_rate_feedbacks',
	fcl_freight_local : 'list_fcl_freight_rate_local_feedbacks',
	air_freight_local : 'list_air_freight_rate_local_feedbacks',
};

const useListFreightRateFeedBacks = ({ filter = {}, source_id, payload, additionalPayload }) => {
	const apiName = API[filter?.service];

	const [{ loading, data }, trigger] = useRequest({
		url    : apiName,
		method : 'GET',
	}, { manual: true });

	const getFeedback = useCallback(async () => {
		const parmas = {
			port_id             : payload?.port_id,
			trade_type          : payload?.trade_type,
			container_size      : payload?.container_size,
			container_type      : payload?.container_type,
			commodity           : payload?.commodity,
			rate_type           : payload?.rate_type,
			cargo_handling_type : payload?.cargo_handling_type,
		};

		const fcl_local_paramas = {
			port_id             : payload?.port_id,
			trade_type          : payload?.trade_type,
			shipping_line_id    : payload?.shipping_line_id,
			container_size      : payload?.container_size,
			container_type      : payload?.container_type,
			commodity           : payload?.commodity,
			service_provider_id : payload?.service_provider_id,
		};

		const air_local_paramas = {
			airport_id          : payload?.airport_id,
			trade_type          : payload?.trade_type,
			airline_id          : payload?.airline_id,
			commodity           : payload?.commodity,
			service_provider_id : payload?.service_provider_id,
		};

		const haulage_params = {
			shipping_line_id        : payload?.shipping_line_id,
			origin_location_id      : payload?.origin_location_id,
			destination_location_id : payload?.destination_location_id,
			container_size          : payload?.container_size,
			container_type          : payload?.container_type,
			commodity               : payload?.commodity,
			haulage_type            : payload?.haulage_type,
			transport_modes         : payload?.transport_modes,
		};

		const air_customs = {
			airport_id          : payload?.airport_id,
			trade_type          : payload?.trade_type,
			commodity           : payload?.commodity,
			service_provider_id : payload?.service_provider_id,
		};

		const paramsMapping = () => {
			if (['fcl_freight_local'].includes(filter?.service)) {
				return fcl_local_paramas;
			}
			if (['air_freight_local'].includes(filter?.service)) {
				return air_local_paramas;
			}
			if (['haulage'].includes(filter?.service)) {
				return haulage_params;
			}
			if (['air_customs'].includes(filter?.service)) {
				return air_customs;
			}
			if (['fcl_customs', 'fcl_cfs'].includes(filter?.service)) {
				return parmas;
			}
			return fcl_local_paramas;
		};

		const paramsMappingResult = paramsMapping();

		try {
			await trigger(
				{
					params: {
						filters                  : additionalPayload ? { ...paramsMappingResult } : { id: source_id },
						booking_details_required : true,
					},
				},
			);
		} catch (err) {
			// console.log(err);
		}
	}, [additionalPayload, filter?.service, payload?.airline_id, payload?.airport_id, payload?.cargo_handling_type,
		payload?.commodity, payload?.container_size, payload?.container_type, payload?.destination_location_id,
		payload?.haulage_type, payload?.origin_location_id, payload?.port_id, payload?.rate_type,
		payload?.service_provider_id, payload?.shipping_line_id, payload?.trade_type,
		payload?.transport_modes, source_id, trigger]);

	return {
		loading,
		data,
		getFeedback,
	};
};

export default useListFreightRateFeedBacks;
