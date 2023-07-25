const getRedirectionDetails = ({
	isCheckoutApiSuccess = false,
	partner_id = '',
	search_id = '',
	importer_exporter_id = '',
	tags = [],
	checkout_id = '',
}) => {
	if (!isCheckoutApiSuccess) {
		return {
			url: `/v2/${partner_id}/service_discovery`,
			message:
				'There is some issue in checkout, redirecting to service discovery',
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
		url     : `/${partner_id}/book/${search_id}/${importer_exporter_id}`,
		message : 'new admin supports only FCL, redirecting to old admin',
	};
};

export default getRedirectionDetails;
