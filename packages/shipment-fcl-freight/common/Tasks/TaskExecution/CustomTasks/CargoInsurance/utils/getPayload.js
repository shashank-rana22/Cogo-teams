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
		customerConfirmationDoc,
		...rest
	} = { ...insuranceDetails, ...billingData };

	payload = {
		...addressId,
		...rest,
		...restPremiumData,
		verificationDoc: {
			gstDoc: {
				name    : gstDoc?.fileName,
				url     : gstDoc?.finalUrl,
				success : true,

			},
			panDoc: {
				name    : panDoc?.fileName,
				url     : panDoc?.finalUrl,
				success : true,

			},
			invoiceDoc: {
				name    : invoiceDoc?.fileName,
				url     : invoiceDoc?.finalUrl,
				success : true,

			},
		},
		customerConfirmationDoc : customerConfirmationDoc?.finalUrl,
		policyForSelf,
		billingType             : 'CORPORATE',
		policyId,
		gstAmount,
	};
	return payload;
};

export default getPayload;
