import { Toast } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { useRequestBf } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { isEmpty } from '@cogoport/utils';
import { useCallback } from 'react';

import useUpdateShipmentService from './useUpdateShipmentService';

const useInsuranceCheckoutAndGenerate = ({
	policyId = '',
	uploadProof = null,
	insuranceDetails = {},
	onCancel = () => {},
	refetch = () => {},
	formData = {},
	shipmentData = {},
	primary_service = {},
	task = {},
	successMessage = 'Task Completed Successfully!',
}) => {
	const { user } = useSelector((state) => state?.profile);
	const { id: userId } = user || {};

	const { apiTrigger, apiLoading } = useUpdateShipmentService({ refetch });

	const [{ loading }, trigger] = useRequestBf({
		auth   : 'post_saas_insurance_checkout_and_generate',
		url    : 'saas/insurance/checkout-and-generate',
		method : 'POST',
	}, { manual: true });

	const payloadForUpdateShipment = {
		data: {
			beneficiary_details: {
				email              : insuranceDetails?.email,
				gst_number         : insuranceDetails?.gstin,
				insured_first_name : insuranceDetails?.insuredFirstName,
				insured_last_name  : insuranceDetails?.insuredLastName,
				pan_number         : insuranceDetails?.panNumber,
				phone_no           : insuranceDetails?.phoneNo,
			},
			beneficiary_billing_details: {
				billing_address : insuranceDetails?.billingAddress,
				billing_city    : insuranceDetails?.billingCity,
				billing_pincode : insuranceDetails?.billingPincode,
				billing_state   : insuranceDetails?.billingState,
				billing_type    : 'CORPORATE',
				party_name      : insuranceDetails?.partyName,
				policy_for_self : insuranceDetails?.policyForSelf,
			},
			invoice_no    : insuranceDetails?.invoiceNo,
			invoice_date  : insuranceDetails?.invoiceDate,
			location_from : insuranceDetails?.locationFrom,
			location_to   : insuranceDetails?.locationTo,
			transit_date  : insuranceDetails?.transitDate
				? new Date(insuranceDetails?.transitDate)
				: undefined,
		},
		ids                 : [task?.service_id],
		performed_by_org_id : primary_service?.service_provider?.id,
		service_type        : task?.service_type,
		shipment_id         : task?.shipment_id,
	};

	let payload = {};
	const { gstDoc, invoiceDoc, panDoc, ...restFormData } = formData;
	Object.keys(restFormData).forEach((key) => {
		if (restFormData[key]) {
			payload = {
				...insuranceDetails,
				...payload,
				policyId,
				[key]           : restFormData[key],
				partyName       : shipmentData?.importer_exporter?.business_name,
				verificationDoc : {
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
			};
		}
	});

	const generateInsurance = useCallback(async () => {
		try {
			const res = await trigger({
				data: {
					...payload,
					source                  : 'SHIPMENT',
					organizationId          : shipmentData?.importer_exporter_id,
					userId,
					sid                     : shipmentData?.serial_id,
					shipmentId              : shipmentData?.id,
					policyId,
					performedBy             : userId,
					customerConfirmationDoc : uploadProof?.[GLOBAL_CONSTANTS.zeroth_index]?.name,
				},
			});

			if (!res.hasError) {
				const updateShipment = await apiTrigger({
					data: payloadForUpdateShipment,
				});

				if (!updateShipment.hasError) {
					Toast.success(successMessage);
					onCancel();
					refetch();
				}
			}
		} catch (err) {
			Toast.error(err?.data?.message);
		}
	}, [apiTrigger, onCancel, payload,
		policyId, refetch, shipmentData?.id, shipmentData?.importer_exporter_id,
		shipmentData?.serial_id, trigger, uploadProof, userId]);

	return {
		loading: loading || apiLoading,
		generateInsurance,
	};
};
export default useInsuranceCheckoutAndGenerate;
