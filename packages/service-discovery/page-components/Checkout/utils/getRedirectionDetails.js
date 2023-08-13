const getRedirectionDetails = ({
	isCheckoutApiSuccess = false,
	partner_id = '',
	tags = [],
	checkout_id = '',
	shipment_id = '',
	redirect_required = 'true',
}) => {
	if (!isCheckoutApiSuccess) {
		return {
			url: `/v2/${partner_id}/service-discovery`,
			message:
				'There is some issue in checkout, redirecting to service discovery',
		};
	}

	if (shipment_id && redirect_required === 'true') {
		return {
			url: `/${partner_id}/shipments/${shipment_id}`,
			message:
				'The checkout is already booked',
		};
	}

	if (!tags.includes('new_admin')) {
		return {
			url: `/${partner_id}/checkout/${checkout_id}`,
			message:
				'This is created using old admin, redirecting to old admin',
		};
	}

	return {
		url     : `/${partner_id}/checkout/${checkout_id}`,
		message : 'new admin supports only FCL, redirecting to old admin',
	};
};

export default getRedirectionDetails;
