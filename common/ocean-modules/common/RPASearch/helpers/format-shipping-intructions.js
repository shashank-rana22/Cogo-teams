import mapKeyValues from './generic-formatted';

const defaultKeyMappings = {
	formatted_body_data : 'formatted_body_data',
	url                 : 'file_url',
	email_received_at   : 'email_received_at',
};

const formatShippingInstructions = ({ mailData }) => {
	const formattedData = [];

	mailData.forEach((shipping_instructions) => {
		const rpaData = shipping_instructions || {};
		const formatted_si = mapKeyValues({
			keyMappings: defaultKeyMappings,
			rpaData,
		});

		const newFormatted = {
			url: formatted_si?.url,
			si_filed_at:
				formatted_si.formatted_body_data?.date_submitted
				|| formatted_si.email_received_at,
		};

		formattedData.push(newFormatted);
	});
	return formattedData;
};

export default formatShippingInstructions;
