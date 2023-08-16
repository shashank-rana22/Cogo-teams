import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { isEmpty } from '@cogoport/utils';

const handlePartyDetails = ({
	billingPartyObj = {},
	collectionPartyObj = {},
	editData = {},
	purchaseInvoiceValues,
}) => {
	const addressDetails = (billingPartyObj?.addresses || []).filter(
		(item) => item?.gst_number === purchaseInvoiceValues?.billing_party_address,
	)?.[GLOBAL_CONSTANTS.zeroth_index];

	let bankDetails = {};
	if (!isEmpty(collectionPartyObj?.bank_details)) {
		bankDetails = (collectionPartyObj?.bank_details || []).filter(
			(item) => item?.bank_account_number === purchaseInvoiceValues?.collection_party_bank_details,
		)?.[GLOBAL_CONSTANTS.zeroth_index];
	} else if (!isEmpty(collectionPartyObj?.documents)) {
		bankDetails = (collectionPartyObj?.documents || []).filter(
			(item) => item?.data?.bank_account_number === purchaseInvoiceValues?.collection_party_bank_details,
		)?.[GLOBAL_CONSTANTS.zeroth_index]?.data;
	}

	const allBillingAddresses = [
		...(collectionPartyObj.billing_addresses || []),
		...(collectionPartyObj.other_addresses || []),
	];

	const collectionPartyBA = allBillingAddresses?.find(
		(address) => address?.id === purchaseInvoiceValues?.collection_party_address,
	) || {};

	const billingPartyDetails = {
		entity_code:
            billingPartyObj?.entity_code
            || editData?.billing_party_detail?.entity_code,
		business_name:
            billingPartyObj?.business_name
            || editData?.billing_party_detail?.business_name,
		address:
            addressDetails?.address
            || editData?.billing_party_detail?.address?.address,
		registration_number:
            billingPartyObj?.registration_number
            || editData?.billing_party_detail?.registration_number,
		gst_number:
            addressDetails?.gst_number
            || editData?.billing_party_detail?.address?.gst_number,
	};

	const collectionPartyDetails = {
		registration_number:
            collectionPartyObj?.registration_number || editData?.registration_number,
		tax_number: collectionPartyBA?.tax_number || editData?.tax_number,
		company_name:
            collectionPartyObj?.company_name
            || collectionPartyObj?.business_name
            || editData?.business_name,
		bank_name: bankDetails?.bank_name || editData?.bank_details?.[GLOBAL_CONSTANTS.zeroth_index]?.bank_name,
		bank_account_number:
            bankDetails?.bank_account_number
            || editData?.bank_details?.[GLOBAL_CONSTANTS.zeroth_index]?.bank_account_number,
		ifsc_number:
            bankDetails?.ifsc_number || editData?.bank_details?.[GLOBAL_CONSTANTS.zeroth_index]?.ifsc_number,
	};

	return {
		billingPartyDetails,
		collectionPartyDetails,
	};
};

export default handlePartyDetails;
