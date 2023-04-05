const getOrgTradePartyFilterType = ({ companyType = '', tradePartyType = '' }) => {
	let stakeholder = '';
	if (companyType === 'self') {
		stakeholder = 'self';
	} else if (
		['self', 'shipper', 'consignee'].includes(tradePartyType)
        && companyType === 'trade_partner'
	) {
		stakeholder = 'paying_party';
	} else if (
		companyType === 'historical'
        && ['shipper', 'consignee'].includes(tradePartyType)
	) {
		stakeholder = ['shipper', 'consignee'];
	} else {
		stakeholder = tradePartyType;
	}
	return stakeholder;
};

export default getOrgTradePartyFilterType;
