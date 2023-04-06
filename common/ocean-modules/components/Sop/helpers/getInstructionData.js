const getInstructionData = ({ data = {} }) => {
	const { operating_instructions = [] } = data || {};
	const format_data = {
		invoice_preference           : [],
		additional_preference        : [],
		document_handling_preference : [],
	};

	operating_instructions.map((item) => format_data?.[item?.instruction].push(item));

	return format_data;
};
export default getInstructionData;
