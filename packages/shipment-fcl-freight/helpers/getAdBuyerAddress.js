const getAdBuyerAddress = ({
	billingParty = {},
	cogoEntityId = '',
	billingPartyAddress = {},
}) => {
	const {
		entity_code = '',
		registration_number = '',
		business_name = '',
		id = '',
	} = billingParty || {};

	const {
		address = '',
		city = '',
		country = '',
		pin_code = '',
		gst_number = '',
	} = billingPartyAddress || {};

	const {
		name = '',
		country_code = '',
	} = country || {};

	return {
		companyType          : 'BUYER',
		organizationSerialId : 24918,
		organizationId       : id,
		organizationName     : business_name,
		pincode              : pin_code,
		address,
		entityCode           : entity_code,
		entityCodeId         : cogoEntityId,
		cityName             : city?.name,
		countryName          : name,
		countryCode          : country_code,
		countryId            : country?.id,
		registrationNumber   : registration_number,
		taxNumber            : gst_number,
	};
};

export default getAdBuyerAddress;
