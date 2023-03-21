const getCreateTradePartnerParams = (values) => {
	const { trade_party_id = '', address = '', trade_party_type = '' } = values;
	const [addressValue, pincodeValue] = (address || '').split('::');

	const params = {
		trade_party_id,
		address : addressValue,
		pincode : pincodeValue,
		trade_party_type,
	};

	return params;
};
export default getCreateTradePartnerParams;
