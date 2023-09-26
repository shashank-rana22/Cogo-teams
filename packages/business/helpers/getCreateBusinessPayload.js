const getCreateBusinessPayload = (values = {}) => {
	const {
		business_name,
		business_type,
		country_code,
		establishment_year,
		identity_number,
		identity_type,
		status,
		trade_name,
		addresses,
	} = values || {};

	const formValues = {
		business_name      : business_name || undefined,
		business_type      : business_type || undefined,
		country_code       : country_code || undefined,
		establishment_year : establishment_year || undefined,
		identity_number    : identity_number || undefined,
		identity_type      : identity_type || undefined,
		status             : status || undefined,
		trade_name         : trade_name || undefined,
	};

	const addressesNew = addresses?.map((item) => ({
		address  : item.address,
		district : item.district,
		city     : item.city,
		state    : item.state,
		pincode  : item.pincode,
	}));

	const payload = {
		...formValues,
		addresses: addressesNew,
	};
	return payload;
};

export default getCreateBusinessPayload;
