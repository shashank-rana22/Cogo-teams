import getOrgTradePartyFilterType from './getOrgTradePartyFilterType';

const getTradePartiesDefaultParams = ({ companyType = '', tradePartyType = '' }) => {
	const params = {
		defaultFilters: {
			trade_party_type    : getOrgTradePartyFilterType({ companyType, tradePartyType }),
			organization_status : 'active',
		},
		defaultParams: {
			billing_addresses_data_required : true,
			other_addresses_data_required   : true,
		},
	};
	return params;
};

export default getTradePartiesDefaultParams;
