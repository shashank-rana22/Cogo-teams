import { isEmpty } from '@cogoport/utils';

const getStringFromQuest = ({ data = [] }) => {
	const formattedStringArray = data.map((item) => {
		const { agent_scoring_block_id, agent_scoring_parameter_id, value } = item;

		if (isEmpty(agent_scoring_parameter_id)) return '';

		const sub_block = agent_scoring_block_id === 'default' ? '' : `${agent_scoring_block_id}:`;

		return `${sub_block} ${agent_scoring_parameter_id || ''}: ${value || ''}`;
	});

	const formattedString = formattedStringArray.join(', ');

	return formattedString;
};

export default getStringFromQuest;
