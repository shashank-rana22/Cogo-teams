const shipmentFtlFreight = {
	'/[partner_id]/booking/ftl/[shipment_id]': {
		navigation          : 'coe-shipments',
		alternateNavigation : ['coe-booking_note_desk',
			'coe-last_mile',
			'coe-kam_desk',
			'coe-shipment_surface',
			'coe-so2_surface'],
	},
};

export default shipmentFtlFreight;
