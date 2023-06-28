/* eslint-disable max-len */

import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';

const getPrefilledValues = (detail, agent_id) => {
	const { primary_service } = detail;

	const main_service = Object.keys(detail?.services || {}).filter((key) => {
		if ((detail?.services || {})[key]?.service_type === primary_service) {
			return (detail?.services || {})[key];
		}
		return null;
	});
	const main_service_details = (detail?.services || {})[
		(main_service || [])[GLOBAL_CONSTANTS.zeroth_index]
	];

	const subjects = {
		fcl_freight     : `FCL Freight Rates: ${main_service_details?.origin_port?.name} to ${main_service_details?.destination_port?.name} - ${detail?.serial_id}`,
		lcl_freight     : `LCL Freight Rates: ${main_service_details?.origin_port?.name} to ${main_service_details?.destination_port?.name} - ${detail?.serial_id}`,
		air_freight     : `Air Freight Rates: ${main_service_details?.origin_airport?.name} to ${main_service_details?.destination_airport?.name} - ${detail?.serial_id}`,
		ftl_freight     : `FTL Freight Rates: ${main_service_details?.origin_location?.name} to ${main_service_details?.destination_location?.name} - ${detail?.serial_id}`,
		ltl_freight     : `LTL Freight Rates: ${main_service_details?.origin_location?.name} to ${main_service_details?.destination_location?.name} - ${detail?.serial_id}`,
		haulage_freight : `Haulage Freight Rates: ${main_service_details?.origin_location?.name} to ${main_service_details?.destination_location?.name} - ${detail?.serial_id}`,
		trailer_freight : `Trailer Freight Rates: ${main_service_details?.origin_location?.name} to ${main_service_details?.destination_location?.name} - ${detail?.serial_id}`,
		fcl_customs     : `FCL Customs Rates: ${main_service_details?.port?.name} - ${detail?.serial_id}`,
		lcl_customs     : `LCL Customs Rates: ${main_service_details?.location?.name} - ${detail?.serial_id}`,
		air_customs     : `Air Customs Rates: ${main_service_details?.airport?.name} - ${detail?.serial_id}`,
	};

	const CLOSING = {
		fcl_freight:
			'Rate in this quotation is what you will be invoiced at. Checkout freight rates from your Cogoport account. If you would like to finalize this booking click on the button below, or feel free to get in touch with me by replying to this email. Currency conversion to compute total cost will be as on the date of booking confirmation.',
	};

	const body = {
		fcl_freight: `Here is the quotation for your requested FCL Freight rates between ${main_service_details?.origin_port?.name} and ${main_service_details?.destination_port?.name}`,

		lcl_freight: `Here is the quotation for your requested LCL Freight rates between ${main_service_details?.origin_port?.name} and ${main_service_details?.destination_port?.name}`,

		air_freight: `Here is the quotation for your requested AIR Freight rates between ${main_service_details?.origin_airport?.name} and ${main_service_details?.destination_airport?.name}`,

		ftl_freight: `Here is the quotation for your requested FTL Freight rates between ${main_service_details?.origin_location?.name} and ${main_service_details?.destination_location?.name}`,

		ltl_freight: `Here is the quotation for your requested LTL Freight rates between ${main_service_details?.origin_location?.name} and ${main_service_details?.destination_location?.name}`,

		haulage_freight: `Here is the quotation for your requested Haulage Freight rates between ${main_service_details?.origin_location?.name} and ${main_service_details?.destination_location?.name}`,

		trailer_freight: `Here is the quotation for your requested Trailer Freight rates between ${main_service_details?.origin_location?.name} and ${main_service_details?.destination_location?.name}`,

		fcl_customs: `Here is the quotation for your requested FCL Customs rates at ${main_service_details?.port?.name}`,

		lcl_customs: `Here is the quotation for your requested LCl Customs rates at ${main_service_details?.location?.name}`,

		air_customs: `Here is the quotation for your requested Air Customs rates at ${main_service_details?.airport?.name}`,
	};

	const TERMS_AND_CONDITIONS = {
		fcl_freight:
			'Rates are per actuals from Shipping Lines, they might be subject to change before shipment confirmation',
	};
	const cc_user_ids = [...new Set(agent_id)];

	return {
		body    : body[main_service_details?.service_type],
		subject : subjects[main_service_details?.service_type],
		closing : CLOSING.fcl_freight,
		cc_user_ids,
		terms_and_conditions:
			detail?.terms_and_conditions?.[GLOBAL_CONSTANTS.zeroth_index]
			|| TERMS_AND_CONDITIONS[main_service_details?.service_type]
			|| '',
	};
};

export default getPrefilledValues;
