const functionSubFunctionMapping = (t) => ({
	sales: [
		{
			label : t('accessManagement:roles_and_permission_select_sales_customer_success'),
			value : 'customer_success',
		},
		{
			label : t('accessManagement:roles_and_permission_select_sales_field_sales'),
			value : 'field_sales',
		},
		{
			label : t('accessManagement:roles_and_permission_select_sales_strategic_sales'),
			value : 'strategic_sales',
		},
		{
			label : t('accessManagement:roles_and_permission_select_sales_cp_sales'),
			value : 'cp_sales',
		},
		{
			label : t('accessManagement:roles_and_permission_select_sales_acquisition'),
			value : 'acquisition',
		},
		{
			label : t('accessManagement:roles_and_permission_select_cp_portfolio'),
			value : 'cp_portfolio',
		},
		{
			label : t('accessManagement:roles_and_permission_select_customer_operations'),
			value : 'customer_operations',
		},
		{
			label : t('accessManagement:roles_and_permission_select_lead_convertor'),
			value : 'lead_convertor',
		},
	],
	supply: [
		{
			label : t('accessManagement:roles_and_permission_select_supply_shippling_line'),
			value : 'shipping_line',
		},
		{
			label : t('accessManagement:roles_and_permission_select_supply_freight_forwarder'),
			value : 'freight_forwarder',
		},
		{
			label : t('accessManagement:roles_and_permission_select_supply_transportation'),
			value : 'transportation',
		},
		{
			label : t('accessManagement:roles_and_permission_select_supply_cfs'),
			value : 'cfs',
		},
		{
			label : t('accessManagement:roles_and_permission_select_supply_customs'),
			value : 'customs',
		},
		{
			label : t('accessManagement:roles_and_permission_select_supply_nvocc'),
			value : 'nvocc',
		},
		{
			label : t('accessManagement:roles_and_permission_select_supply_overseas'),
			value : 'overseas',
		},
		{
			label : t('accessManagement:roles_and_permission_select_supply_iata_agents'),
			value : 'iata_agents',
		},
	],
	operations: [
		{
			label : t('accessManagement:roles_and_permission_select_operations_booking_desk'),
			value : 'booking_desk',
		},
		{
			label : t('accessManagement:roles_and_permission_select_operations_post_shipment'),
			value : 'post_shipment',
		},
		{
			label : t('accessManagement:roles_and_permission_select_operations_finops'),
			value : 'finops',
		},
		{
			label : t('accessManagement:roles_and_permission_select_operations_common_customer_operations'),
			value : 'common_customer_operations',
		},
		{
			label : t('accessManagement:roles_and_permission_select_operations_cp_customer_operations'),
			value : 'cp_customer_operations',
		},
		{
			label : t('accessManagement:roles_and_permission_select_operations_mid_size_customer_operations'),
			value : 'mid_size_customer_operations',
		},
		{
			label : t('accessManagement:roles_and_permission_select_operations_enterprise_customer_operations'),
			value : 'enterprise_customer_operations',
		},
	],
	finance  : [],
	training : [
		{
			label : t('accessManagement:roles_and_permission_select_training_training_general'),
			value : 'training_general',
		},
		{
			label : t('accessManagement:roles_and_permission_select_training_tech'),
			value : 'tech',
		},
		{
			label : t('accessManagement:roles_and_permission_select_training_product'),
			value : 'product',
		},
	],
	hr: [
		{
			label : t('accessManagement:roles_and_permission_select_hr_admin'),
			value : 'hr_admin',
		},
		{
			label : t('accessManagement:roles_and_permission_select_hrbp'),
			value : 'hrbp',
		},
		{
			label : t('accessManagement:roles_and_permission_select_talent_acquisition'),
			value : 'talent_acquisition',
		},
	],
	external: [
		{
			label : t('accessManagement:roles_and_permission_select_enrichment'),
			value : 'enrichment',
		},
	],
});

export default functionSubFunctionMapping;
