const getRedirectionDetails = ({
	tags = [],
	redirect_required = '',
	importer_exporter_id = '',
	id = '',
	partner_id = '',
	shipment_id = '',
}) => {
	if (shipment_id && redirect_required === 'true') {
		return {
			url     : `/${partner_id}/service_discovery`,
			message : 'The Shipment is already booked',
		};
	}

	if (!tags.includes('new_admin')) {
		return {
			url: `/${partner_id}/book/${id}/${importer_exporter_id}`,
			message:
				'This is created using old admin, redirecting to old admin',
		};
	}

	return {
		url     : `/${partner_id}/book/${id}/${importer_exporter_id}`,
		message : 'new admin supports only FCL, redirecting to old admin',
	};
};

export default getRedirectionDetails;
