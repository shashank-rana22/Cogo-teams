const getAdSellerAddress = ({
	collectionParty = {},
	collectionPartyAddress = {},
}) => {
	const {
		entity_code = '',
		cogo_entity_id = '',
		country = '',
		business_name = '',
		country_id = '',
		registration_number = '',
	} = collectionParty || {};

	const {
		address = '',
		organization_id = '',
		tax_number = '',
		pincode = '',
	} = collectionPartyAddress || {};

	return {
		companyType          : 'SELLER',
		organizationSerialId : 24918,
		organizationId       : organization_id,
		organizationName     : business_name,
		pincode,
		address,
		entityCode           : entity_code,
		entityCodeId         : cogo_entity_id,
		countryName          : country?.name,
		countryCode          : country?.country_code,
		countryId            : country_id,
		registrationNumber   : registration_number,
		taxNumber            : tax_number,
	};
};

export default getAdSellerAddress;
