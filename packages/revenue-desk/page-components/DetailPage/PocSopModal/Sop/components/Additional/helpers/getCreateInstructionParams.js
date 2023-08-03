const getCreateInstructionParams = ({ formValues }) => {
	const PARAMS = { instruction: 'additional_preference' };

	PARAMS.sop_instructions = formValues?.additional || [];

	return PARAMS;
};

export default getCreateInstructionParams;
