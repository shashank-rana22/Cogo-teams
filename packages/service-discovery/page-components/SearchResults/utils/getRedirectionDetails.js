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
			url     : `/${partner_id}/service-discovery`,
			message : 'The Shipment is already booked',
		};
	}

	if (!tags.includes('version2')) {
		return {
			url: `/${partner_id}/book/${id}/${importer_exporter_id}`,
			message:
				'This is created using old admin, redirecting to old admin',
		};
	}

	return {
		url     : `/${partner_id}/book/${id}/${importer_exporter_id}`,
		message : 'new admin does not support this service, redirecting to old admin',
	};
};

export default getRedirectionDetails;
