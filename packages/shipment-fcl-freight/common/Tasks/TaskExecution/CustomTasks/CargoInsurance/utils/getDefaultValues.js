import { addDays } from '@cogoport/utils';

import { getDate } from '../../../../../../utils/getDate';

const MIN_DATE_LIMIT = 1;

const getDefaultValues = ({ insuranceDetails = {}, shipment_data = {}, policyDetails = {} }) => {
	const {
		cargo_insurance_commodity_id,
		destination_country_id,
		origin_country_id,
		cargo_insurance_commodity_description,
		cargo_value_currency,
		cargo_value,
	} = policyDetails || {};

	const {
		invoiceDate,
		policyCommodityId,
		cargoDescription,
		incoterm,
		policyCountryId,
		policyType,
		riskCoverage = 'ALL_RISK',
		transitDate,
		policyCurrency,
		cargoAmount,
		verificationDoc,
	} = insuranceDetails || {};

	const { inco_term } = shipment_data || {};

	const INVOICE_DATE = getDate(invoiceDate);

	const values = {
		...insuranceDetails,
		riskCoverage,
		invoiceDate       : INVOICE_DATE,
		cargoAmount       : cargoAmount || cargo_value,
		gstDoc            : verificationDoc?.gstDoc,
		panDoc            : verificationDoc?.panDoc,
		incoterm          : (incoterm || inco_term)?.toUpperCase(),
		policyCurrency    : policyCurrency || cargo_value_currency,
		invoiceDoc        : verificationDoc?.invoiceDoc,
		policyCommodityId : policyCommodityId || cargo_insurance_commodity_id,
		cargoDescription  : cargoDescription || cargo_insurance_commodity_description,
		policyCountryId   : policyCountryId || (policyType === 'IMPORT' ? origin_country_id : destination_country_id),
		transitDate       : transitDate ? getDate(insuranceDetails?.transitDate) : addDays(new Date(), MIN_DATE_LIMIT),
	};
	return values;
};

export default getDefaultValues;
