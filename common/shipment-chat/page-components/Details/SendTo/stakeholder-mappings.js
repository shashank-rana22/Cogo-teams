const mappings = {
	sales_agent   : ['CCS', 'booking_desk'],
	booking_agent : ['booking_desk', 'document_desk', 'service_ops3', 'sales_agent', 'BL/DO', 'costbooking_ops',
		'lastmile_ops'],
	ckam: ['booking_desk', 'document_desk', 'service_ops3', 'sales_agent', 'BL/DO', 'costbooking_ops',
		'lastmile_ops'],
	service_ops1: ['CCS', 'document_desk', 'service_ops3', 'sales_agent', 'BL/DO', 'costbooking_ops',
		'lastmile_ops', 'supply_Agent'],
	service_ops2: ['CCS', 'booking_desk', 'service_ops3', 'lastmile_ops', 'supply_Agent',
		'costbooking_ops', 'BL/DO'],
	costbooking_ops: ['CCS', 'booking_desk', 'document_desk', 'service_ops3', 'supply_Agent',
		'lastmile_ops', 'BL/DO'],
	lastmile_ops : ['CCS', 'booking_desk', 'document_desk', 'service_ops3', 'costbooking_ops', 'BL/DO', 'supply_Agent'],
	supply_agent : ['booking_desk', 'document_desk', 'service_ops3', 'costbooking_ops', 'BL/DO', 'lastmile_ops'],
	release_desk : ['CCS', 'booking_desk', 'document_desk', 'service_ops3', 'lastmile_ops', 'supply_Agent',
		'costbooking_ops', 'BL/DO'],
	collection_desk: ['CCS', 'booking_desk', 'document_desk', 'service_ops3', 'lastmile_ops', 'supply_Agent',
		'costbooking_ops', 'BL/DO'],

	default: [
		'booking_desk',
		'document_desk',
		'service_ops3',
		'costbooking_ops',
		'CCS',
		'BL/DO',
		'supply_Agent',
		'lastmile_ops',
		'sales_agent',
	],
};

export default mappings;
