const performance_and_incentives = {
	scoring_and_incentive_plans: [
		{
			api          : 'list_partners',
			access_type  : 'private',
			service_name : 'partner',
		},
		{
			api          : 'get_agent_scoring_eligible_roles',
			access_type  : 'private',
			service_name : 'agent_scoring',
		},
		{
			api          : 'post_agent_scoring_config',
			access_type  : 'private',
			service_name : 'agent_scoring',
		},
		{
			api          : 'post_agent_scoring_config_attributes',
			access_type  : 'private',
			service_name : 'agent_scoring',
		},
		{
			api          : 'get_agent_scoring_blocks',
			access_type  : 'private',
			service_name : 'agent_scoring',
		},
		{
			api          : 'get_agent_scoring_configs',
			access_type  : 'private',
			service_name : 'agent_scoring',
		},
		{
			api          : 'get_agent_scoring_config',
			access_type  : 'private',
			service_name : 'agent_scoring',
		},
	],
	performance_and_incentives_leaderboard: [],
};

export default performance_and_incentives;
