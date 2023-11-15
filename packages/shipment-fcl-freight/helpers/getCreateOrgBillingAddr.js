const getCreateOrgBillingAddr = ({
	// task = {},
	values = {}, countryId = '', userData,
}) => {
	const {
		name = '',
		business_name = '',
		pincode = '',
		tax_number = '',
		address = '',
		tax_number_document_url = '',
		mobile_number = {},
		email = '', is_sez = '',
	} = values || {};

	// const { task_field_id = '' } = task || {};

	const payload = {
		address,
		pincode,
		tax_number,
		organization_branch_id  : userData?.organization_branch_id,
		name                    : business_name,
		tax_number_document_url : tax_number_document_url?.finalUrl,
		// organization_trade_party_id : task_field_id,
		country_id              : countryId,
		is_sez                  : is_sez === 'yes',
		poc_details             : [{
			name,
			email,
			mobile_number       : mobile_number?.number,
			mobile_country_code : mobile_number?.country_code,
		}],
		organization_id: userData?.organization_id,
	};

	return payload;
};

export default getCreateOrgBillingAddr;
