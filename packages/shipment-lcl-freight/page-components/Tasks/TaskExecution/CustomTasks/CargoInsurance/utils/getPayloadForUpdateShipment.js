const getPayloadForUpdateShipment = ({ insuranceDetails = {}, primary_service = {}, task = {} }) => {
	const {
		billingAddress, billingCity,
		billingPincode, billingState, gstin, partyName,
		insuredFirstName, insuredLastName, panNumber, phoneNo,
		email, policyForSelf, locationFrom, invoiceNo, invoiceDate, transitDate, locationTo,
	} = insuranceDetails || {};

	const { service_provider } = primary_service || {};

	const { service_type, shipment_id, service_id } = task || {};

	const payload = {
		data: {
			beneficiary_details: {
				email,
				gst_number         : gstin,
				insured_first_name : insuredFirstName,
				insured_last_name  : insuredLastName,
				pan_number         : panNumber,
				phone_no           : phoneNo,
			},
			beneficiary_billing_details: {
				billing_address : billingAddress,
				billing_city    : billingCity,
				billing_pincode : billingPincode,
				billing_state   : billingState,
				billing_type    : 'CORPORATE',
				party_name      : partyName,
				policy_for_self : policyForSelf,
			},
			invoice_no    : invoiceNo,
			invoice_date  : invoiceDate,
			location_from : locationFrom,
			location_to   : locationTo,
			transit_date  : transitDate
				? new Date(transitDate)
				: undefined,
		},
		ids                 : [service_id],
		performed_by_org_id : service_provider?.id,
		service_type,
		shipment_id,
	};

	return payload;
};

export default getPayloadForUpdateShipment;
