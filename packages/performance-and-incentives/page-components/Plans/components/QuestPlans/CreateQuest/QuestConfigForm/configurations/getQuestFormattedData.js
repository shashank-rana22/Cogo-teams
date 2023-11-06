import { startCase } from '@cogoport/utils';

const getQuestFormattedData = ({ data = [], setBlockId = () => {} }) => {
	// console.log('data::', data);

	// const dataObj = data.forEach((item) => {

	// });

	// const questFormattedData = data.map((item) => ({
	// 	agent_scoring_block_id     : item?.sub_block_name,
	// 	agent_scoring_parameter_id : item?.agent_scoring_parameter_display_name,
	// 	value                      : item?.value,
	// }));

	const questObj = data.reduce((acc, item) => {
		const updatedAcc = { ...acc };

		setBlockId((b) => ({ ...b, [item?.agent_scoring_block_id]: startCase(item?.sub_block_name) }));

		const parameters = {
			agent_scoring_parameter_id : item?.agent_scoring_parameter_display_name,
			value                      : item?.value,
		};

		if (!updatedAcc[item.agent_scoring_block_id]) {
			updatedAcc[item.agent_scoring_block_id] = [parameters];
		} else {
			updatedAcc[item.agent_scoring_block_id].push(parameters);
		}
		return updatedAcc;
	}, {});

	return questObj;
};

export default getQuestFormattedData;
