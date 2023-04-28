import mapKeyValues from './generic-formatted';

const defaultKeyMappings = {
	formatted_body_data: 'formatted_body_data',
};

const formatContainerDetails = ({ mailData }) => {
	const formattedData = [];

	mailData.forEach((bill_of_lading) => {
		const rpaData = bill_of_lading || {};
		const formatted_cd = mapKeyValues({
			keyMappings: defaultKeyMappings,
			rpaData,
		});
		const newFormatted = {
			bl_number        : formatted_cd.formatted_body_data?.bill_of_lading,
			container_number : formatted_cd.formatted_body_data?.container_number,
		};

		newFormatted?.container_number?.forEach((item) => {
			formattedData.push({
				bl_number        : newFormatted?.bl_number,
				container_number : item.replaceAll(' ', ''),
			});
		});
	});
	return formattedData;
};

export default formatContainerDetails;
