import { isEmpty, upperCase } from '@cogoport/utils';

import getFormattedDate from './getFormattedDate';

const getPayloadForSaveAsDraft = ({
	draftData = {},
	performedBy = '',
	formRef,
	billingType,
	getValues,
	policyId = '',
}) => {
	const selectedAddress = formRef.current.address();

	const {
		invoiceDate, invoiceNo, pan_number,
		invoiceDoc, panDoc, gstDoc, aadharDoc,
		coverageFrom, coverageTo, packageDescription, aadharNumber, transitDate, ...rest
	} = getValues() || {};

	const {
		userId, organizationId, metadata = {}, cargoDetails = {}, invoiceDetails = {}, billingDetails = {},
		verificationDoc = {}, pocDetails = {}, source = '',
	} = draftData || {};

	const formmattedTransitDate = getFormattedDate({ currentDate: transitDate });
	const formmattedInvoiceDate = getFormattedDate({ currentDate: invoiceDate });

	return ({
		userId,
		organizationId,
		policyId,
		source,
		billingParty: {
			...(billingDetails || {}),
			partyName      : selectedAddress?.name,
			billingAddress : selectedAddress?.address,
			billingPincode : selectedAddress?.pincode,
			billingState   : selectedAddress?.state,
			addressType    : upperCase(selectedAddress?.address_type) || null,
			billingCity    : selectedAddress?.city,
			billingType    : upperCase(billingType),
			gstNumber      : selectedAddress?.tax_number,
			panNumber      : pan_number,
			policyForSelf  : true,
			addressId      : selectedAddress?.id,
			aadharNumber,
		},
		cargoDetails: {
			...(cargoDetails || {}),
			packaging    : packageDescription,
			locationFrom : coverageFrom,
			locationTo   : coverageTo,
			transitDate  : formmattedTransitDate,
			...(rest || {}),
		},
		invoiceDetails: {
			...(invoiceDetails || {}),
			invoiceNo,
			invoiceDate: formmattedInvoiceDate,
		},
		pocDetails,
		verificationDoc: {
			...(verificationDoc || {}),
			invoiceDoc: !isEmpty(invoiceDoc) ? {
				name : invoiceDoc?.fileName,
				url  : invoiceDoc?.finalUrl,
			} : null,
			panDoc: !isEmpty(panDoc) ? {
				name : panDoc?.fileName,
				url  : panDoc?.finalUrl,
			} : null,
			gstDoc: !isEmpty(gstDoc) ? {
				name : gstDoc?.fileName,
				url  : gstDoc?.finalUrl,
			} : null,
			aadharDoc: !isEmpty(aadharDoc) ? {
				name : aadharDoc?.fileName,
				url  : aadharDoc?.finalUrl,
			} : null,
		},
		performedBy,
		metadata: { ...metadata, selectedAddress },
	});
};

export { getPayloadForSaveAsDraft };
