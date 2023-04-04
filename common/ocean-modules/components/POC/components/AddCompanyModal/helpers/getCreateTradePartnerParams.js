const getCreateTradePartnerParams = (values) => {
	const { trade_party_id = '', address = '', trade_party_type = '', pincode } = values;
	const [addressValue] = (address || '').split('::');

	const params = {
		trade_party_id,
		address: addressValue,
		pincode,
		trade_party_type,
	};

	return params;
};
export default getCreateTradePartnerParams;
