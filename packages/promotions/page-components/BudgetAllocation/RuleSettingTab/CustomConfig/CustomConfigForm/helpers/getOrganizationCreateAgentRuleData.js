const getOrganizationCreateAgentRuleData = (values) => {
	const { agent_id = '', ...restValues } = values || {};
	return {
		agent_id,
		discount_config: {
			...restValues,
		},
	};
};

export default getOrganizationCreateAgentRuleData;
