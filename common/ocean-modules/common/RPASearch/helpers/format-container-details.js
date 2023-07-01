import mapKeyValues from './generic-formatted';

const KEY_MAPPINGS = {
	formatted_body_data: 'formatted_body_data',
};

const formatContainerDetails = ({ mailData = [] }) => {
	const FORMATTED_DATA = [];

	mailData.forEach((bill_of_lading) => {
		const rpaData = bill_of_lading || {};

		const formatted_cd = mapKeyValues({
			keyMappings: KEY_MAPPINGS,
			rpaData,
		});

		const newFormatted = {
			bl_number        : formatted_cd.formatted_body_data?.bill_of_lading,
			container_number : formatted_cd.formatted_body_data?.container_number,
		};

		newFormatted?.container_number?.forEach((item) => {
			FORMATTED_DATA.push({
				bl_number        : newFormatted?.bl_number,
				container_number : item.replaceAll(' ', ''),
			});
		});
	});

	return FORMATTED_DATA;
};

export default formatContainerDetails;
