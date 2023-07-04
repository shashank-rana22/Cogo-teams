import mapKeyValues from './generic-formatted';

const KEY_MAPPINGS = {
	formatted_body_data : 'formatted_body_data',
	url                 : 'file_url',
	email_received_at   : 'email_received_at',
};

const formatShippingInstructions = ({ mailData = [] }) => {
	const FORMATTED_DATA = [];

	mailData.forEach((shipping_instructions) => {
		const rpaData = shipping_instructions || {};

		const formatted_si = mapKeyValues({
			keyMappings: KEY_MAPPINGS,
			rpaData,
		});

		const newFormatted = {
			url: formatted_si?.url,
			si_filed_at:
				formatted_si.formatted_body_data?.date_submitted
				|| formatted_si.email_received_at,
		};

		FORMATTED_DATA.push(newFormatted);
	});

	return FORMATTED_DATA;
};

export default formatShippingInstructions;
