const getPayloadForUpdateShipment = ({ insuranceDetails = {}, primary_service = {}, task = {} }) => {
	const payload = {
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

	return payload;
};

export default getPayloadForUpdateShipment;
