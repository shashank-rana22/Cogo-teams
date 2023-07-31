import { isEmpty } from '@cogoport/utils';

const getPayload = ({
	premiumData = {},
	insuranceDetails = {},
	policyForSelf = false,
	billingData = {},
	addressId = '',
	policyId = '',
}) => {
	const { taxAmount, ...restPremiumData } = premiumData;

	let payload = {};

	const { gstAmount = taxAmount } = insuranceDetails || {};

	const {
		aadharNumber,
		organizationAddressId,
		organizationBillingAddressId,
		panDoc,
		gstDoc,
		invoiceDoc,
		...rest
	} = policyForSelf
		? insuranceDetails
		: { ...insuranceDetails, ...billingData };

	payload = {
		...addressId,
		...rest,
		...restPremiumData,
		verificationDoc: {
			gstDoc: !isEmpty(gstDoc?.finalUrl) ? {
				name    : gstDoc?.fileName,
				url     : gstDoc?.finalUrl,
				success : true,

			} : undefined,
			panDoc: !isEmpty(panDoc?.finalUrl) ? {
				name    : panDoc?.fileName,
				url     : panDoc?.finalUrl,
				success : true,

			} : undefined,
			invoiceDoc: !isEmpty(invoiceDoc?.finalUrl) ? {
				name    : invoiceDoc?.fileName,
				url     : invoiceDoc?.finalUrl,
				success : true,

			} : undefined,
		},
		policyForSelf,
		billingType: 'CORPORATE',
		policyId,
		gstAmount,
	};
	return payload;
};

export default getPayload;
