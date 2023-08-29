const getOptions = ({ t = () => {} }) => ({
	organization: [
		{
			label : t('allocation:booking_agent_label'),
			value : 'booking_agent',
		},
		{
			label : t('allocation:sales_agent_label'),
			value : 'sales_agent',
		},
		{
			label : t('allocation:supply_agent_label'),
			value : 'supply_agent',
		},
		{
			label : t('allocation:ckam_label'),
			value : 'ckam',
		},
	],
	partner: [
		{
			label : t('allocation:entity_manager_label'),
			value : 'entity_manager',
		},
		{
			label : t('allocation:portfolio_manager_label'),
			value : 'portfolio_manager',
		},
	],
});

const getStakeholderTypeOptions = ({ service_type = '', t = () => {} }) => {
	const options = getOptions({ t });

	return options[service_type];
};

export default getStakeholderTypeOptions;
