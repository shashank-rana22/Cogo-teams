const getQuestFormattedData = ({ data = [] }) => {
	const questFormattedData = data.map((item) => ({
		agent_scoring_block_id     : item?.sub_block_name,
		agent_scoring_parameter_id : item?.agent_scoring_parameter_display_name,
		value                      : item?.value,
	}));

	return questFormattedData;
};

export default getQuestFormattedData;
