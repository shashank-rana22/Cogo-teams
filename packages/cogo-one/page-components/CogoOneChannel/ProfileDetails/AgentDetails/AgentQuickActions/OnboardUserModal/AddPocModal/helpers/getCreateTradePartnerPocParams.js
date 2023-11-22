import { isEmpty } from '@cogoport/utils';

const getCreateTradePartnerPocParams = (values) => {
	const {
		address = '',
		alternate_mobile_number,
		mobile_number,
		organization_id,
		email,
		name,
		trade_party_id,
		trade_party_type,
		country_id,
		tradePartyId,
	} = values || {};

	const [addressValue] = (address || '').split('::');

	const params = {
		address: addressValue,
		...(!isEmpty(mobile_number) && {
			mobile_country_code : mobile_number?.country_code,
			mobile_number       : mobile_number?.number,
		}),
		...(!isEmpty(alternate_mobile_number) && {
			alternate_mobile_country_code : alternate_mobile_number?.country_code,
			alternate_mobile_number       : alternate_mobile_number?.number,
		}),
		organization_id,
		email,
		name,
		trade_party_id: trade_party_id || tradePartyId,
		trade_party_type,
		country_id,
	};

	return params;
};
export default getCreateTradePartnerPocParams;
