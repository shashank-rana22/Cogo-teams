import mapKeyValues from './generic-formatted';

const KEY_MAPPING = {
	formatted_body_data : 'formatted_body_data',
	url                 : 'file_url',
};
const DEFAULT_CONTAINERS_COUNT = 1;
const formatBillOfLading = ({ mailData = [] }) => {
	const formattedData = mailData.map((bill_of_lading) => {
		const rpaData = bill_of_lading || {};

		const formatted_bl = mapKeyValues({
			keyMappings: KEY_MAPPING,
			rpaData,
		});

		return ({
			url             : formatted_bl.url,
			document_number : formatted_bl.formatted_body_data?.bill_of_lading,
			containers_count:
				formatted_bl.formatted_body_data?.container_number?.length || DEFAULT_CONTAINERS_COUNT,
		});
	});

	return formattedData;
};

export default formatBillOfLading;
