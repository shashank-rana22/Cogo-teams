const performance_and_incentives = {
	scoring_and_incentive_plans: [
		{
			api          : 'list_partners',
			access_type  : 'private',
			service_name : 'partner',
		},
		{
			api          : 'list_roles',
			access_type  : 'private',
			service_name : 'auth',
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
		{
			api          : 'get_agent_scoring_parameters',
			access_type  : 'private',
			service_name : 'agent_scoring',
		},
		{
			api          : 'get_agent_scoring_quests',
			access_type  : 'private',
			service_name : 'agent_scoring',
		},
		{
			api          : 'get_agent_scoring_quest',
			access_type  : 'private',
			service_name : 'agent_scoring',
		},
		{
			api          : 'post_agent_scoring_quest',
			access_type  : 'private',
			service_name : 'agent_scoring',
		},
		{
			api          : 'post_agent_scoring_quest_configuration',
			access_type  : 'private',
			service_name : 'agent_scoring',
		},
		{
			api          : 'post_agent_scoring_quest_attributes',
			access_type  : 'private',
			service_name : 'agent_scoring',
		},
	],
	performance_and_incentives_leaderboard: [
		{
			api          : 'get_agent_scoring_reports',
			access_type  : 'private',
			service_name : 'agent_scoring',
		},
		{
			api          : 'get_agent_scoring_view',
			access_type  : 'private',
			service_name : 'agent_scoring',
		},
		{
			api          : 'get_agent_scoring_report_stats',
			access_type  : 'private',
			service_name : 'agent_scoring',
		},
		{
			api          : 'get_agent_scoring_incentive_user_stats',
			access_type  : 'private',
			service_name : 'agent_scoring',
		},
		{
			api          : 'get_agent_scoring_user_progress',
			access_type  : 'private',
			service_name : 'agent_scoring',
		},
	],
	performance_public_leaderboard: [
		{
			api          : 'get_agent_scoring_reports',
			access_type  : 'private',
			service_name : 'agent_scoring',
		},
		{
			api          : 'get_agent_scoring_report_stats',
			access_type  : 'private',
			service_name : 'agent_scoring',
		},
	],
};

export default performance_and_incentives;
