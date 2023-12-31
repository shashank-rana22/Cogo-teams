import getGeoConstants from '@cogoport/globalization/constants/geo';

const REMOVE_PLUS_SIGN = 1;

function formatOrganizationUsers({ data, filterKey }) {
	const geo = getGeoConstants();
	const getListData = data?.[filterKey === 'organization_id' ? 'list' : 'data'] || [];

	return getListData?.map((item) => {
		const {
			organization_id,
			user_id, name,
			whatsapp_number,
			mobile_number,
			email,
			whatsapp_country_code,
			mobile_country_code,
			organization = {},
			work_scopes = [],
		} = item || {};

		const countryCode = whatsapp_country_code || mobile_country_code || geo.country.mobile_country_code;
		const mobileNumber = `${countryCode?.slice(REMOVE_PLUS_SIGN) || ''}${whatsapp_number || mobile_number || ''}`;

		return {
			organization_id,
			user_id,
			userName                : name,
			whatsapp_number_eformat : whatsapp_number || mobile_number,
			email,
			countryCode,
			mobile_no               : mobileNumber,
			business_name           : organization?.business_name,
			work_scopes,
		};
	});
}
export default formatOrganizationUsers;
