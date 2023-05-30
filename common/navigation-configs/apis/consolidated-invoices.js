const consolidated_invoices = {
	consolidated_sales_invoices: [
		{
			api          : 'list_shipments',
			access_type  : 'private',
			service_name : 'shipment',
		},
		{
			api          : 'list_organizations',
			access_type  : 'private',
			service_name : 'organization',
		},
		{
			api          : 'create_shipment_consolidated_sell_invoice',
			access_type  : 'private',
			service_name : 'shipment',
		},
		{
			api          : 'get_shipments_for_consolidated_invoicing',
			access_type  : 'private',
			service_name : 'shipment',
		},
		{
			api          : 'list_organization_invoicing_parties',
			access_type  : 'private',
			service_name : 'organization',
		},
		{
			api          : 'post_sales_invoice_kam_list_customers',
			access_type  : 'private',
			service_name : 'shipment',
		},
		{
			api         : 'get_sales_invoice_list',
			access_type : 'private',
		},
		{
			api          : 'get_sales_invoice_kam_overall_stats',
			access_type  : 'private',
			service_name : 'shipment',
		},
		{
			api          : 'list_shipment_consolidated_sell_invoices',
			access_type  : 'private',
			service_name : 'shipment',
		},
		{
			api          : 'update_shipment_consolidated_sell_invoice',
			access_type  : 'private',
			service_name : 'shipment',
		},
		{
			api          : 'get_shipment_consolidated_sell_invoice',
			access_type  : 'private',
			service_name : 'shipment',
		},
		{
			api          : 'create_shipment_consolidated_credit_note',
			access_type  : 'private',
			service_name : 'shipment',
		},
		{
			api          : 'list_shipment_consolidated_credit_notes',
			access_type  : 'private',
			service_name : 'shipment',
		},
		{
			api          : 'list_organization_trade_parties',
			access_type  : 'private',
			service_name : 'shipment',
		},
	],
	consolidated_purchase_invoices: [
		{
			api          : 'list_shipments',
			access_type  : 'private',
			service_name : 'shipment',
		},
		{
			api          : 'get_purchase_consolidated_list',
			access_type  : 'private',
			service_name : 'shipment',
		},
		{
			api          : 'get_purchase_consolidated_stats',
			access_type  : 'private',
			service_name : 'shipment',
		},
		{
			api         : 'get_purchase_bills_list',
			access_type : 'private',
		},
		{
			api          : 'list_organizations',
			access_type  : 'private',
			service_name : 'organization',
		},
		{
			api          : 'list_organization_trade_parties',
			access_type  : 'private',
			service_name : 'organization',
		},
		{
			api          : 'list_cogo_entities',
			access_type  : 'private',
			service_name : 'partner',
		},
		{
			api          : 'search_products_v2',
			access_type  : 'private',
			service_name : 'sage',
		},
		{
			api          : 'create_shipment_consolidated_purchase_invoice',
			access_type  : 'private',
			service_name : 'shipment',
		},
		{
			api          : 'create_organization_document',
			access_type  : 'private',
			service_name : 'organization',
		},
		{
			api          : 'get_shipments_for_consolidated_knockoff',
			access_type  : 'private',
			service_name : 'shipment',
		},
		{
			api          : 'update_shipment_consolidated_purchase_invoice',
			access_type  : 'private',
			service_name : 'shipment',
		},
		{
			api          : 'list_shipment_consolidated_purchase_invoices',
			access_type  : 'private',
			service_name : 'shipment',
		},
		{
			api          : 'get_shipment_consolidated_purchase_invoice',
			access_type  : 'private',
			service_name : 'shipment',
		},
	],
};

export default consolidated_invoices;
