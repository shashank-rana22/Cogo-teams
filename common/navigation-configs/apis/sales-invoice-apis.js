const apis = [
	{
		api          : 'update_invoice_currency',
		access_type  : 'private',
		service_name : 'bookings',
		feature      : 'sales_invoice',
	},
	{
		api          : 'update_shipment_invoice_currency',
		access_type  : 'private',
		service_name : 'shipment',
	},
	{
		api          : 'update_invoice_status',
		access_type  : 'private',
		service_name : 'bookings',
		feature      : 'sales_invoice',
	},
	{
		api          : 'update_invoice_remarks',
		access_type  : 'private',
		service_name : 'bookings',
		feature      : 'sales_invoice',
	},
	{
		api          : 'update_invoice_payment_mode',
		access_type  : 'private',
		service_name : 'bookings',
		feature      : 'sales_invoice',
	},
	{
		api          : 'update_shipment_invoice_payment_mode',
		access_type  : 'private',
		service_name : 'shipment',
	},
	{
		api          : 'update_invoice_line_items',
		access_type  : 'private',
		service_name : 'bookings',
		feature      : 'sales_invoice',
	},
	{
		api          : 'get_credit_notes',
		access_type  : 'private',
		service_name : 'bookings',
		feature      : 'sales_invoice',
	},
];

export default apis;
