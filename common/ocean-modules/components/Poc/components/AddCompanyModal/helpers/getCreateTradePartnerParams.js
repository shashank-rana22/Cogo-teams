import { isEmpty } from '@cogoport/utils';

const ORG_ID_REQUIRED = ['create_new_company'];

const getCreateTradePartnerParams = (values) => {
	const {
		trade_party_id = '',
		address = '',
		trade_party_type = '',
		pincode,
		alternate_mobile_number,
		mobile_number,
		importer_exporter_id,
		organization_id,
		companyType,
		...restValues
	} = values;

	const [addressValue] = (address || '').split('::');

	const params = {
		trade_party_id,
		address: addressValue,
		pincode,
		trade_party_type,
		...(!isEmpty(mobile_number) ? {
			mobile_country_code : mobile_number?.country_code,
			mobile_number       : mobile_number?.number,
		} : {}),
		...(!isEmpty(alternate_mobile_number) ? {
			alternate_mobile_country_code : alternate_mobile_number?.country_code,
			alternate_mobile_number       : alternate_mobile_number?.number,
		} : {}),
		...(ORG_ID_REQUIRED.includes(companyType) ? { organization_id: organization_id || importer_exporter_id } : {}),
		...restValues,
	};

	return params;
};
export default getCreateTradePartnerParams;
