const getCreateInstructionParams = ({ formValues }) => {
	const PARAMS = { instruction: 'document_handling_preference' };

	PARAMS.sop_instructions = [formValues];

	return PARAMS;
};
export default getCreateInstructionParams;
