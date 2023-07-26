import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { isEmpty } from '@cogoport/utils';

const DEFAULT_SPAN = 6;
const INITIAL_VALUE_FOR_SPAN = 0;
const MAX_SPAN = 12;
const FLEX_OFFSET = 1;
const PERCENT_FACTOR = 100;

const FULL_WIDTH_CONTROL_TYPES = ['fieldArray', 'edit_service_charges'];

function checkIfFieldArrayVisible(controls = []) {
	return controls?.some?.(({ show = true } = {}) => show);
}

export function calcWidth(span) {
	const validSpan = Math.min((span || DEFAULT_SPAN), MAX_SPAN);
	return `${(validSpan / MAX_SPAN) * PERCENT_FACTOR - FLEX_OFFSET}%`;
}

export default function getTotalFields({ fields = [], showElements = {} }) {
	const TOTAL_FIELDS = [];

	let rowWiseFields = [];
	let span = INITIAL_VALUE_FOR_SPAN;

	(fields || []).forEach((field) => {
		const { type, name, span: fieldSpan = DEFAULT_SPAN, controls = [] } = field || {};
		const isFullWidthControl = FULL_WIDTH_CONTROL_TYPES.includes(type);

		const {
			[name]: showItem = !isFullWidthControl,
		} = (isFullWidthControl ? showElements?.[GLOBAL_CONSTANTS.zeroth_index] : showElements) || {};

		if (isFullWidthControl && checkIfFieldArrayVisible(controls)) {
			if (!isEmpty(rowWiseFields)) {
				TOTAL_FIELDS.push(rowWiseFields);
			}
			TOTAL_FIELDS.push([{ ...field, flex: calcWidth(MAX_SPAN) }]);

			span = INITIAL_VALUE_FOR_SPAN;
			rowWiseFields = [];
			return;
		}

		if (!showItem) {
			return;
		}

		span += fieldSpan;
		if (span === MAX_SPAN) {
			rowWiseFields.push({ ...field, flex: calcWidth(fieldSpan) });
			TOTAL_FIELDS.push(rowWiseFields);

			span = INITIAL_VALUE_FOR_SPAN;
			rowWiseFields = [];
			return;
		}

		if (span > MAX_SPAN) {
			TOTAL_FIELDS.push(rowWiseFields);
			rowWiseFields = [];

			span = Math.min(fieldSpan, MAX_SPAN);
		}

		rowWiseFields.push({ ...field, flex: calcWidth(fieldSpan) });
	});

	if (!isEmpty(rowWiseFields)) {
		TOTAL_FIELDS.push(rowWiseFields);
	}

	return { TOTAL_FIELDS, DEFAULT_SPAN, MAX_SPAN };
}
