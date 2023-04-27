const feedback = [
	{
		api          : 'update_shipment_feedback',
		access_type  : 'public',
		feature      : 'feedback',
		service_name : 'shipment',
	},
	{
		api          : 'send_shipment_feedback',
		access_type  : 'private',
		feature      : 'feedback',
		service_name : 'shipment',
	},
	{
		api          : 'get_shipment_feedback',
		access_type  : 'public',
		feature      : 'feedback',
		service_name : 'shipment',
	},
	{
		api          : 'get_shipment',
		access_type  : 'private',
		feature      : 'feedback',
		service_name : 'bookings',
	},
];

export default feedback;
