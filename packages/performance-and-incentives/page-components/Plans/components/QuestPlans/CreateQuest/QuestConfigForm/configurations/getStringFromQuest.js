// import { isEmpty } from '@cogoport/utils';

const getStringFromQuest = ({ data = {}, blockId = {} }) => {
	// const formattedStringArray = data.map((item) => {
	// 	const { agent_scoring_block_id, agent_scoring_parameter_id, value } = item;

	// 	if (isEmpty(agent_scoring_parameter_id)) return '';

	// 	const sub_block = agent_scoring_block_id === 'default' ? '' : `${agent_scoring_block_id}:`;

	// 	return `${sub_block} ${agent_scoring_parameter_id || ''}: ${value || ''}`;
	// });

	const formattedStringArray = Object.keys(data).map((key) => {
		const sub_block_name = blockId?.[key] === 'default' ? '' : `${blockId?.[key]}:`;

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
