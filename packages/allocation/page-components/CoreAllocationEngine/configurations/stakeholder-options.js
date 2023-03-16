const options = {
	organization: [
		{
			label : 'Booking Agent',
			value : 'booking_agent',
		},
		{
			label : 'Sales Agent',
			value : 'sales_agent',
		},
		{
			label : 'Supply Agent',
			value : 'supply_agent',
		},
		{
			label : 'CKAM',
			value : 'ckam',
		},
	],
	partner: [
		{
			label : 'Entity Manager',
			value : 'entity_manager',
		},
		{
			label : 'Portfolio Manager',
			value : 'portfolio_manager',
		},
	],
};

const getStakeholderTypeOptions = ({ service_type = '' }) => options[service_type];

export default getStakeholderTypeOptions;
