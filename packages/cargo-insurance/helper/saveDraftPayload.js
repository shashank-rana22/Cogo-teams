import { upperCase, isEmpty } from '@cogoport/utils';

const getPayloadForDraft = ({ data = {}, pocDetails, performedBy, policySearchId = '' }) => {
	const { firstName, lastName, email, phoneNo } = pocDetails || {};
	const { userId = '', organizationId = '', metadata = {}, rateRequest = {}	} = data || {};

	const {
		invoiceValue
		= '', invoiceCurrency = '', hsCode = '',
		destinationCountryId = '', originCountryId = '',
	} = rateRequest || {};

	const { origin = {}, destination = {}, transitMode = '' } = metadata || {};

	return {
		userId,
		organizationId,
		source     : 'ADMIN',
		pocDetails : {
			insuredFirstName : firstName,
			insuredLastName  : lastName,
			email,
			phoneCode        : phoneNo?.country_code,
			phoneNo          : phoneNo?.number,
		},
		billingParty: {
			billingType: 'CORPORATE',
		},
		invoiceDetails: {
			invoiceCurrency,
			invoiceValue,
		},
		cargoDetails: {
			originCountryId,
			destinationCountryId,
			hsCode,
			transitMode       : upperCase(transitMode),
			destinationPortId : origin?.id,
			originPortId      : destination?.id,
		},
		performedBy,
		policySearchId,
		metadata,
	};
};

const getPayloadForSaveAsDraft = async ({
	draftData = {}, performedBy = '', formRef, billingType, getValues,
	draftId = '',
}) => {
	const selectedAddress = await formRef.current.address();

	const {
		invoiceDate, invoiceNo, pan_number,
		invoiceDoc, panDoc, gstDoc, aadharDoc, coverageFrom, coverageTo, packageDescription, aadharNumber, ...rest
	} = getValues() || {};

	const {
		userId, organizationId, metadata = {}, cargoDetails = {}, invoiceDetails = {}, billingDetails = {},
		verificationDoc = {}, pocDetails = {},
	} = draftData || {};

	return ({
		userId,
		organizationId,
		policyId     : draftId,
		source       : 'ADMIN',
		billingParty : {
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
			...(rest || {}),
		},
		invoiceDetails: {
			...(invoiceDetails || {}),
			invoiceNo,
			invoiceDate,
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

export { getPayloadForDraft, getPayloadForSaveAsDraft };
