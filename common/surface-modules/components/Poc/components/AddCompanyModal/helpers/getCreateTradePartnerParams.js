import { isEmpty } from '@cogoport/utils';

const ORG_ID_REQUIRED = ['create_new_company'];

const getCreateTradePartnerParams = (values) => {
	const {
		address = '',
		alternate_mobile_number,
		mobile_number,
		importer_exporter_id,
		organization_id,
		companyType,
		tax_number_document_url,
		...restValues
	} = values || {};

	const [addressValue, pincode] = (address || '').split('::');
	console.log(values, 'Vauee');
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
		...(!isEmpty(tax_number_document_url?.finalUrl) && {
			tax_number_document_url: tax_number_document_url?.finalUrl,
		}),
		...(ORG_ID_REQUIRED.includes(companyType) && { organization_id: organization_id || importer_exporter_id }),
		...(companyType === 'historical' && pincode ? { pincode } : {}),
		...restValues,
	};

	return params;
};
export default getCreateTradePartnerParams;
