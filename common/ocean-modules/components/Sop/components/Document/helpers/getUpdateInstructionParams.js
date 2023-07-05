const getUpdateInstructionParams = ({ formValues, instruction_id }) => {
	const PARAMS = {
		sop_update_data: [{ ...formValues, id: instruction_id }],
	};

	return PARAMS;
};
export default getUpdateInstructionParams;
