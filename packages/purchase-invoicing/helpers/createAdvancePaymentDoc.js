import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';

const DEFAULT_AMOUNT = 0;
const PAYMENT_TYPE = 'advanced';
const DOC_TYPE = 'high_advance_payment_proof';

export const checkHighAdvancePaymentProof = (formValues, calculatedValues) => {
	const calculations = +(calculatedValues?.invoice_amount || DEFAULT_AMOUNT)
	* GLOBAL_CONSTANTS.others.percentage_factor_for_advance_amount
	<= +(formValues?.advanced_amount || DEFAULT_AMOUNT);

	return formValues?.payment_type === PAYMENT_TYPE && calculations;
};

export const createAdvancePaymentDoc = (values, extraData, callback) => {
	const {
		shipment_data = {},
		serviceProviderOrg: serviceProviderOrganization = {},
		formValues = {},
		calculatedValues = {},
	} = extraData || {};

	if (shipment_data?.shipment_type !== 'ftl_freight') {
		return;
	}

	const is_hight_advance_payment_proof = checkHighAdvancePaymentProof(formValues, calculatedValues);

	if (is_hight_advance_payment_proof && formValues?.advanced_payment_proof?.fileUrl) {
		const createShipmentDocumentPayload = {
			shipment_id        : shipment_data?.id,
			uploaded_by_org_id : serviceProviderOrganization?.id,
			document_type      : DOC_TYPE,
			documents          : [
				{
					data: {
						invoice_number : values?.tax_invoice_no,
						url            : formValues?.advance_payment_proof?.fileUrl,
					},
					file_name    : formValues?.advance_payment_proof?.fileName,
					document_url : formValues?.advance_payment_proof?.fileUrl,
				},
			],
		};

		callback(createShipmentDocumentPayload);
	}
};
