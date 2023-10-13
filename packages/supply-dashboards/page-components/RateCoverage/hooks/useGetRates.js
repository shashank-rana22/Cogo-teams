import { useRequest } from '@cogoport/request';
// import { useEffect } from 'react';

// import formatGetRates from '../helpers/formatGetRates/format-get-rates';

const API_MAPPING = {
	fcl_freight       : '/get_fcl_freight_rate',
	fcl_freight_local : '/get_fcl_freight_rate_local',
	air_freight_local : '/get_air_freight_rate_local',
	haulage_freight   : '/get_haulage_freight_rate',
	trailer_freight   : '/get_trailer_freight_rate',
	fcl_customs       : '/get_fcl_customs_rate',
	air_customs       : '/get_air_customs_rate',
	lcl_customs       : '/get_lcl_customs_rate',
	fcl_cfs           : '/get_fcl_cfs_rate',
	ltl_freight       : '/get_ltl_freight_rate',
	ftl_freight       : '/get_ftl_freight_rate',
	lcl_freight       : '/get_lcl_freight_rate',
};

const useGetRates = ({
	// payload,
	chargeName = undefined,
	watch,
	service_type,
	// trade_type,
}) => {
	const charge = chargeName || service_type;

	const api = API_MAPPING[charge];

	const [{ data }, trigger] = useRequest({
		url    : api,
		method : 'get',
	}, { manual: true });

	const fields = watch();

	const {
		service_provider_id,
		origin_location_id,
		destination_location_id,
		container_size,
		container_type,
		haulage_type,
		transport_modes,
		location_id,
		commodity,
	} = fields;

	// const newPayload = formatGetRates({
	// 	payload,
	// 	charge,
	// 	fields,
	// 	trade_type,
	// });

	const getRates = async () => {
		try {
			const res = await trigger({
				// params: newPayload,
			});
			return res?.data;
		} catch (error) {
			// console.log(error.data);
			return null;
		}
	};

	let canGetRate = charge === 'air_freight_local' || charge === 'fcl_freight_local';

	switch (charge) {
		case 'haulage_freight':
			canGetRate = (
				service_provider_id
				&& origin_location_id
				&& destination_location_id
				&& container_size
				&& container_type
				&& haulage_type
				&& transport_modes
			);
			break;
		case 'trailer_freight':
			canGetRate = (
				fields.service_provider
				&& fields.origin
				&& fields.destination
				&& container_size
				&& container_type
			);
			break;
		case 'fcl_customs':
			canGetRate = (
				service_provider_id
				&& location_id
				&& container_size
				&& container_type
				&& fields.trade_type
			);
			break;
		case 'air_customs':
			canGetRate = (
				service_provider_id
				&& location_id
				&& fields.trade_type
			);
			break;
		case 'fcl_cfs':
			canGetRate = (
				service_provider_id
				&& location_id
				&& fields.trade_type
				&& container_size
				&& container_type
				&& fields.cargo_handling_type
			);
			break;
		case 'ftl_freight':
			canGetRate = (
				fields.service_provider
				&& fields.origin
				&& fields.destination
				&& fields.truck_type
			);
			break;
		case 'ltl_freight':
			canGetRate = (
				fields.service_provider
				&& fields.origin
				&& fields.destination
			);
			break;
		case 'fcl_freight':
			canGetRate = (
				service_provider_id
				&& origin_location_id
				&& destination_location_id
				&& container_size
				&& container_type
				&& fields.shipping_line_id
			);
			break;
		case 'lcl_customs':
			canGetRate = (
				service_provider_id
				&& location_id
				&& fields.trade_type
				&& commodity
			);
			break;
		case 'lcl_freight':
			canGetRate = (
				service_provider_id
				&& origin_location_id
				&& destination_location_id
				&& commodity
			);
			break;
		default:
			break;
	}

	console.log(getRates);
	// useEffect(() => {
	// 	if (canGetRate) getRates();
	// // eslint-disable-next-line react-hooks/exhaustive-deps
	// }, [JSON.stringify(newPayload)]);

	return {
		data, canGetRate,
	};
};
export default useGetRates;
