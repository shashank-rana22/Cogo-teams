const getStringFromQuest = ({ data = {}, blockId = {} }) => {
	const formattedStringArray = Object.keys(data).map((key) => {
		const sub_block_name = blockId?.[key] === 'default' ? '' : `${blockId?.[key]}:`;

		const some = (data?.[key] || []).map((item) => {
			const { agent_scoring_parameter_id = '', value = '' } = item || {};
			const agent_scoring_parameter_name = agent_scoring_parameter_id === 'default'
				? '' : `${agent_scoring_parameter_id}:`;
			return `${sub_block_name} ${agent_scoring_parameter_name}: ${value}`;
		});

		return some.join(', ');
	});

	const formattedString = formattedStringArray.join(', ');

	return formattedString;
};

export default getStringFromQuest;
