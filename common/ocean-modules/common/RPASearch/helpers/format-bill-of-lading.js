import mapKeyValues from './generic-formatted';

const defaultKeyMappings = {
	formatted_body_data : 'formatted_body_data',
	url                 : 'file_url',
};

const formatBillOfLading = ({ mailData }) => {
	const formattedData = [];

	mailData.forEach((bill_of_lading) => {
		const rpaData = bill_of_lading || {};
		const formatted_bl = mapKeyValues({
			keyMappings: defaultKeyMappings,
			rpaData,
		});
		const newFormatted = {
			url             : formatted_bl.url,
			document_number : formatted_bl.formatted_body_data?.bill_of_lading,
			containers_count:
				formatted_bl.formatted_body_data?.container_number?.length || 1,
		};

		formattedData.push(newFormatted);
	});
	return formattedData;
};

export default formatBillOfLading;
