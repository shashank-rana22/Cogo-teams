const mappings = {
	booking_agent : ['service_Ops1', 'service_Ops2', 'service_Ops3', 'sales_agent'],
	service_ops1  : ['Kam', 'supply_Agent', 'service_Ops2', 'sales_agent'],
	service_ops2  : ['Kam', 'service_Ops1', 'service_Ops3', 'sales_agent'],
	supply_agent  : ['service_Ops1', 'service_Ops2', 'service_Ops3'],
	service_ops3  : ['Kam', 'service_Ops2', 'sales_agent'],
	sales_agent   : ['Kam', 'service_Ops2', 'service_Ops1', 'service_Ops3'],
	default       : [
		'service_Ops1',
		'service_Ops2',
		'service_Ops3',
		'Kam',
		'supply_Agent',
		'Lastmile_Ops',
		'sales_agent',
	],
};

export default mappings;
