const getUpdateInstructionParams = ({ formValues, instruction_id }) => {
	const params = {
		sop_update_data: [{ ...formValues, id: instruction_id }],
	};

	return params;
};
export default getUpdateInstructionParams;
