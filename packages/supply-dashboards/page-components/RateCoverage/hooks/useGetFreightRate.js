import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { useEffect } from 'react';

import formatGetRates from '../configurations/helpers/formatGetRates/format-get-rates';

const API_NAME = {
	fcl_freight : 'get_fcl_freight_rate',
	fcl_customs : 'get_fcl_customs_rate',
	air_freight : 'get_air_freight_rate',
	lcl_freight : 'get_lcl_freight_rate',
	lcl_customs : 'get_lcl_customs_rate',
	air_customs : 'get_air_customs_rate',
	trailer     : 'get_trailer_freight_rate',
	ltl_freight : 'get_ltl_freight_rate',
	haulage     : 'get_haulage_freight_rate',
	ftl_freight : 'get_ftl_freight_rate',
};

// const useGetFreightRate = ({ filter, formValues, cardData }) => {
// 	const endPoint = API_NAME[filter?.service];

// 	const dependencyValue = {
// 		service_provider_id : formValues?.service_provider_id,
// 		shipping_line_id    : formValues?.shipping_line_id,
// 	};

// 	const { profile = {} } = useSelector((state) => state);
// 	const { partner = {} } = profile;
// 	const { id } = partner;
// 	const [{ loading, data }, trigger] = useRequest({
// 		url    : endPoint,
// 		method : 'GET',
// 	}, { manual: true });

// 	const getFreightRate = async () => {
// 		const fclParams = {
// 			origin_port_id      : cardData?.origin_port_id,
// 			destination_port_id : cardData?.destination_port_id,
// 			shipping_line_id    : formValues?.shipping_line_id,
// 			service_provider_id : formValues?.service_provider_id,
// 		};
// 		const airParams = {
// 			origin_airport_id      : cardData?.origin_airport_id,
// 			destination_airport_id : cardData?.destination_airport_id,
// 			airline_id             : formValues?.airline_id,
// 			service_provider_id    : formValues?.service_provider_id,
// 		};
// 		const paramsMapping = filter?.service === 'air_freight' ? airParams : fclParams;
// 		try {
// 			await trigger({
// 				params: {
// 					id             : cardData?.id,
// 					commodity      : formValues?.commodity,
// 					container_size : formValues?.container_size,
// 					container_type : formValues?.container_type,
// 					cogo_entity_id : id || undefined,
// 					...paramsMapping,
// 				},
// 			});
// 		} catch (err) {
// 			console.log(err);
// 		}
// 	};

// 	useEffect(() => {
// 		if (formValues?.service_provider_id
// 			&& (formValues?.shipping_line_id || formValues?.airline_id)) { getFreightRate(); }
// 	// eslint-disable-next-line react-hooks/exhaustive-deps
// 	}, [JSON.stringify(dependencyValue)]);

// 	return {
// 		data,
// 		loading,
// 	};
// };

// export default useGetFreightRate;

const useGetRates = ({
	values,
	filter,
	cardData,
	formValues,
}) => {
	const charge = filter?.service;

	const api = API_NAME[charge];
	const { profile = {} } = useSelector((state) => state);
	const { partner = {} } = profile;
	const { id } = partner;

	const [{ data }, trigger] = useRequest({
		url    : api,
		method : 'GET',
	}, { manual: true });

	const fields = values;

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
	} = formValues;

	const newPayload = formatGetRates({
		// payload,
		charge,
		fields: formValues,
		// trade_type,
	});

	const getRates = async () => {
		try {
			const res = await trigger({
				params         : newPayload,
				id             : cardData?.id,
				cogo_entity_id : id || undefined,
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

	useEffect(() => {
		if (canGetRate) getRates();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [JSON.stringify(newPayload)]);

	return {
		data, canGetRate,
	};
};
export default useGetRates;
