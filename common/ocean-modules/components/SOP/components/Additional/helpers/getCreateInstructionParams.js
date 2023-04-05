const getCreateInstructionParams = ({ formValues }) => {
	const params = { instruction: 'additional_preference' };
	params.sop_instructions = formValues?.additional || [];
	return params;
};

export default getCreateInstructionParams;
