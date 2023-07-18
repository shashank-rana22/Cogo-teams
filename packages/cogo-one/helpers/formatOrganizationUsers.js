import getGeoConstants from '@cogoport/globalization/constants/geo';

const REMOVE_PLUS_SIGN = 1;

function formatOrganizationUsers({ data }) {
	const { list = [] } = data || {};
	const geo = getGeoConstants();

	return list?.map((item) => {
		const { organization_id, user_id, name, whatsapp_number_eformat, email, whatsapp_country_code } = item || {};

		const countryCode = whatsapp_country_code || geo.country.mobile_country_code;

		return {
			organization_id,
			user_id,
			userName  : name,
			whatsapp_number_eformat,
			email,
			countryCode,
			mobile_no : `${countryCode?.slice(REMOVE_PLUS_SIGN) || ''}${whatsapp_number_eformat}`,
		};
	});
}
export default formatOrganizationUsers;
