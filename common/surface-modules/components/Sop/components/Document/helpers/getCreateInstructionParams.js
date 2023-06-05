const getCreateInstructionParams = ({ formValues }) => {
	const params = { instruction: 'document_handling_preference' };
	params.sop_instructions = [formValues];
	return params;
};
export default getCreateInstructionParams;
