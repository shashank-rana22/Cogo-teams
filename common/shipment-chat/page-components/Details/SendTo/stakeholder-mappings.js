const mappings = {
	booking_agent : ['service_Ops1', 'service_Ops2', 'service_Ops3', 'sales_Agent'],
	service_ops1  : ['Kam', 'supply_Agent', 'service_Ops2'],
	service_ops2  : ['Kam', 'service_Ops1', 'service_Ops3'],
	supply_agent  : ['service_Ops1', 'service_Ops2', 'service_Ops3'],
	service_ops3  : ['Kam', 'service_Ops2'],
	sales_agent   : ['service_Ops1', 'service_Ops2', 'service_Ops3', 'Kam'],
	default       : [
		'service_Ops1',
		'service_Ops2',
		'service_Ops3',
		'Kam',
		'supply_Agent',
		'Lastmile_Ops',
		'sales_Agent',
	],
};

export default mappings;
