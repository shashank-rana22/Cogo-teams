const scopePossibleThroughCriteriaMap = {
	self: [
		{ label: 'Sales Agent View', value: 'sales_agent_view' },
		{ label: 'Supply Agent View', value: 'supply_agent_view' },
		{ label: 'Booking Agent View', value: 'booking_agent_view' },
		{ label: 'CKAM View', value: 'ckam_view' },
	],
	team: [
		{ label: 'Sales Team Members View', value: 'sales_team_members_view' },
		{ label: 'Supply Team Members View', value: 'supply_team_members_view' },
		{ label: 'Booking Team Members View', value: 'booking_team_members_view' },
		{ label: 'CKAM Team View', value: 'ckam_team_view' },
	],
	location: [
		{ label: 'Sales Location View', value: 'sales_location_view' },
		{ label: 'Supply Location View', value: 'supply_location_view' },
	],
	channel_partner: [
		{ label: 'Entity Manager View', value: 'entity_manager_view' },
		{ label: 'Portfolio Manager View', value: 'portfolio_manager_view' },
		{ label: 'Credit Controller View', value: 'credit_controller_view' },
		{ label: 'Trade Finance Agent View', value: 'trade_finance_agent_view' },
	],
	channel_partner_team: [
		{ label: 'Entity Manager Team Members View', value: 'entity_manager_team_members_view' },
		{ label: 'Portfolio Manager Team Members View', value: 'portfolio_manager_team_members_view' },
		{ label: 'Trade Finance Team Members View', value: 'trade_finance_team_members_view' },
		{ label: 'Credit Controller Team Members View', value: 'credit_controller_team_members_view' },
		{ label: 'Entity Manager View', value: 'entity_manager_view' },
	],
};

export default scopePossibleThroughCriteriaMap;
