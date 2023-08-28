const getEachUserFormatedData = ({ userDetails = {} }) => {
	const {
		stakeholder_type = '', user = {}, id = '', name: pocName = '',
		user_id: customerUserId = '',
		mobile_country_code: pocMobileCountryCode = '', processes = [], mobile_number = '', email = '', trade_type = '',
		chat_option = false,
		is_primary_poc = false,
		is_customer = false,
		is_trade_partner = false,
	} = userDetails;

	const {
		name = '',
		id: userId = '',
		mobile_country_code = '',
		mobile_number: mobileNumber = '',
		email: userEmail = '',
	} = user || {};
	return {
		id,
		name                : name || pocName,
		stakeholder_type    : Object.keys(userDetails || {}).includes('processes') ? processes : [stakeholder_type],
		mobileNumber        : mobileNumber || mobile_number,
		mobile_country_code : mobile_country_code || pocMobileCountryCode,
		userId              : userId || customerUserId,
		email               : userEmail || email,
		trade_type,
		chatOption          : chat_option,
		isPrimaryPoc        : is_primary_poc,
		isCustomer          : is_customer,
		isTradePartner      : is_trade_partner,
	};
};

export default getEachUserFormatedData;
