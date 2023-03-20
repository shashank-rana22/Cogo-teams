const mappings = {
	booking_agent : ['Service_Ops1', 'Service_Ops2', 'Service_Ops3', 'Docs_Team'],
	service_ops1  : ['Kam', 'Supply_Agent', 'Service_Ops2', 'Docs_Team'],
	service_ops2  : ['Kam', 'Service_Ops1', 'Service_Ops3', 'Docs_Team'],
	supply_agent  : ['Service_Ops1', 'Service_Ops2', 'Service_Ops3', 'Docs_Team'],
	service_ops3  : ['Kam', 'Service_Ops2', 'Docs_team'],
	default       : [
		'Service_Ops1',
		'Service_Ops2',
		'Service_Ops3',
		'Kam',
		'Supply_Agent',
		'Docs_Team',
		'Lastmile_Ops',
	],
};

export default mappings;
