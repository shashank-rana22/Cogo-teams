const business_finance = {
	coeFinance: [
		{
			api         : 'put_purchase_bills_by_id',
			access_type : 'private',
			feature     : 'coe_finance',
		},
		{
			api          : 'list_shipment_documents',
			access_type  : 'private',
			service_name : 'shipment',
		},
		{
			api         : 'get_purchase_bills_sid_details_by_id',
			access_type : 'private',
			feature     : 'coe_finance',
		},
		{
			api         : 'get_purchase_bills_by_id_bill_time_line',
			access_type : 'private',
			feature     : 'coe_finance',
		},

		{
			api          : 'get_collection_party_variance',
			access_type  : 'private',
			service_name : 'shipment',
		},
		{
			api          : 'list_shipments',
			access_type  : 'private',
			service_name : 'shipment',
		},
		{
			api          : 'list_promotion_budget_transactions',
			access_type  : 'private',
			service_name : 'promotion',
		},
		{
			api         : 'get_purchase_bills_list',
			access_type : 'private',
			feature     : 'coe_finance',
		},
		{
			api         : 'get_sales_invoice_list',
			access_type : 'private',
			feature     : 'coe_finance',
		},
		{
			api         : 'get_purchase_bills_by_id',
			access_type : 'private',
			feature     : 'coe_finance',
		},
		{
			api         : 'get_purchase_bills_stats',
			access_type : 'private',
			feature     : 'coe_finance',
		},
		{
			api          : 'get_shipment_cost_sheet',
			access_type  : 'private',
			feature      : 'coe_finance',
			service_name : 'shipment',
		},
		{
			api         : 'get_payments_accounts_org_stats',
			access_type : 'private',
			feature     : 'coe_finance',
		},
		{
			api          : 'update_shipment',
			access_type  : 'private',
			feature      : 'coe_finance',
			service_name : 'shipment',
		},
	],

};

export default business_finance;
