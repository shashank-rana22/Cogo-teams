const TOTAL_SPAN = 12;

const getTotalFields = ({ controls = [] }) => {
	let row_wise_fields = [];
	let current_span = 0;

	const TOTAL_FIELDS = [];

	controls.forEach((ctrl = {}) => {
		const { span = 0 } = ctrl || {};
		if ((current_span + span) > TOTAL_SPAN) {
			TOTAL_FIELDS.push(row_wise_fields);
			row_wise_fields = [];
			row_wise_fields.push(ctrl);
			current_span = span;
		} else {
			row_wise_fields.push(ctrl);
			current_span += span;
		}
	});

	if (row_wise_fields.length) {
		TOTAL_FIELDS.push(row_wise_fields);
	}

	return TOTAL_FIELDS;
};

export default getTotalFields;
