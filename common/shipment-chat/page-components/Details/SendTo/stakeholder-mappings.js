const mappings = {
	booking_agent : ['service_Ops1', 'document_desk', 'service_Ops3', 'sales_agent', 'BL/DO', 'costbooking_ops'],
	service_ops1  : ['CCS', 'supply_Agent', 'document_desk', 'sales_agent'],
	service_ops2  : ['CCS', 'service_Ops1', 'service_Ops3', 'sales_agent', 'lastmile_ops',
		'costbooking_ops', 'BL/DO'],
	costbooking_ops: ['CCS', 'service_Ops1', 'service_ops2', 'service_Ops3', 'sales_agent',
		'lastmile_ops', 'BL/DO'],
	lastmile_ops : ['CCS', 'service_Ops1', 'service_ops2', 'service_Ops3', 'sales_agent', 'costbooking_ops', 'BL/DO'],
	supply_agent : ['service_Ops1', 'document_desk', 'service_Ops3'],
	service_ops3 : ['CCS', 'document_desk', 'sales_agent'],
	sales_agent  : ['CCS', 'document_desk', 'service_Ops1', 'service_Ops3'],
	default      : [
		'service_Ops1',
		'document_desk',
		'service_Ops3',
		'costbooking_ops',
		'CCS',
		'BL/DO',
		'supply_Agent',
		'lastmile_ops',
		'sales_agent',
	],
};

export default mappings;
