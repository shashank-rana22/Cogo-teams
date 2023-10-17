const getHeader = ({ t = () => {} }) => ({
	details : t('locations:header_details_label'),
	create  : t('locations:header_create_label'),
	update  : t('locations:header_update_label'),
});

export default getHeader;
