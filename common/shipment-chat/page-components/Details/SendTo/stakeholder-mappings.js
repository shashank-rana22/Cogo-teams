const mappings = {
	booking_agent : ['service_ops1', 'service_ops2', 'service_ops3', 'sales_agent'],
	service_ops1  : ['Kam', 'supply_agent', 'service_ops2'],
	service_ops2  : ['Kam', 'service_ops1', 'service_ops3'],
	supply_agent  : ['service_ops1', 'service_ops2', 'service_ops3'],
	service_ops3  : ['Kam', 'service_ops2'],
	sales_agent   : ['service_ops1', 'service_ops2', 'service_ops3', 'Kam'],
	default       : [
		'service_ops1',
		'service_ops2',
		'service_ops3',
		'Kam',
		'supply_agent',
		'Lastmile_ops',
		'sales_agent',
	],
};

export default mappings;
