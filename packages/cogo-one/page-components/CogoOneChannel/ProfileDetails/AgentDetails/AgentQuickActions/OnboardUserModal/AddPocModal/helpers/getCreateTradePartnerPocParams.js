import { isEmpty } from '@cogoport/utils';

const getCreateTradePartnerPocParams = (values) => {
	const {
		address = '',
		alternate_mobile_number,
		mobile_number,
		importerExporterId,
		email,
		name,
		trade_party_id,
		trade_party_type,
		country_id,
		tradePartyId,
		business_name,
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
		organization_id : importerExporterId,
		email,
		name,
		trade_party_id  : trade_party_id || tradePartyId,
		trade_party_type,
		country_id,
		business_name,
	};

	return params;
};
export default getCreateTradePartnerPocParams;
