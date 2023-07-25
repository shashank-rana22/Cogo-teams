const DEFAULT_SPAN = 6;
const INITIAL_VALUE_FOR_SPAN = 0;
const MAX_SPAN = 12;

function checkIfFieldArrayVisible({ controls = [] }) {
	return controls.some((control) => control.show ?? true);
}

export default function getTotalFields({ fields = [], showElements = {} }) {
	const TOTAL_FIELDS = [];

	let rowWiseFields = [];
	let span = INITIAL_VALUE_FOR_SPAN;

	(fields || []).forEach((field) => {
		const { type, name, span: fieldSpan = DEFAULT_SPAN, controls = [] } = field || {};
		const { [name]: showItem = true } = showElements;

		if (type === 'fieldArray' && checkIfFieldArrayVisible(controls)) {
			span += MAX_SPAN;
			return;
		}

		if (!showItem || type === 'fieldArray') {
			return;
		}

		span += fieldSpan;
		if (span === MAX_SPAN) {
			span = INITIAL_VALUE_FOR_SPAN;

			rowWiseFields.push(field);
			TOTAL_FIELDS.push(rowWiseFields);

			rowWiseFields = [];
			return;
		}

		if (span > MAX_SPAN) {
			span = INITIAL_VALUE_FOR_SPAN;

			TOTAL_FIELDS.push(rowWiseFields);
			rowWiseFields = [];
		}

		rowWiseFields.push(field);
	});

	if (rowWiseFields.length) {
		TOTAL_FIELDS.push(rowWiseFields);
	}

	return { TOTAL_FIELDS, DEFAULT_SPAN, MAX_SPAN };
}
