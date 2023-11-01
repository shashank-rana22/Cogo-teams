import getApiErrorString from '@cogoport/forms/utils/getApiError';

const URL_MAPPING = {
	fcl_freight : 'fcl',
	air_freight : 'air-freight',
};

const getRedirectionDetails = ({
	isCheckoutApiSuccess = false,
	partner_id = '',
	tags = [],
	checkout_id = '',
	shipment_id = '',
	redirect_required = 'true',
	primary_service = '',
	error = {},
}) => {
	if (!isCheckoutApiSuccess) {
		return {
			url     : `/v2/${partner_id}/service-discovery`,
			message : error?.response?.data && error?.response?.status === 400
				? getApiErrorString(error?.response?.data)
				: 'There is some issue in checkout',
			redirection    : false,
			button_message : 'Go to Service Discovery',
		};
	}

	if (shipment_id && redirect_required === 'true') {
		let url = `/${partner_id}/shipments/${shipment_id}`;

		if (URL_MAPPING[primary_service]) {
			url = `/v2/${partner_id}/booking/${URL_MAPPING[primary_service]}/${shipment_id}`;
		}

		return {
			url,
			message: 'The checkout is already booked',
		};
	}

	if (!tags.includes('version2') && redirect_required === 'true') {
		return {
			url     : `/${partner_id}/checkout/${checkout_id}`,
			message : 'This is created using old admin, redirecting to old admin',
		};
	}

	return {
		url: `/${partner_id}/checkout/${checkout_id}`,
		message:
			'new admin does not support this service, redirecting to old admin',
	};
};

export default getRedirectionDetails;
