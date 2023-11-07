const getStringFromQuest = ({ data = {}, blockId = {} }) => {
	const formattedStringArray = Object.keys(data).map((key) => {
		const sub_block_name = blockId?.[key] === 'Default' ? '' : `${blockId?.[key]}:`;

		const some = (data?.[key] || []).map((item) => {
			const { agent_scoring_parameter_id = '', value = '' } = item || {};

			return `${sub_block_name} ${agent_scoring_parameter_id}: ${value}`;
		});

		return some.join(', ');
	});

	const formattedString = formattedStringArray.join(', ');

	return formattedString;
};

export default getStringFromQuest;
