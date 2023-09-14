import { getDateFromTime } from './getDateFromTime';

const ALLOWED = ['morning', 'afternoon', 'night'];

export default function getDefaultValues({ list = [] }) {
	const DEFAULT_VALUES = {};

	list.forEach((shift) => {
		if (ALLOWED.includes(shift.shift_name) && shift.status === 'active') {
			DEFAULT_VALUES[
				`${shift.shift_name}_shift_start_time`] = getDateFromTime(shift.start_time_local);
			DEFAULT_VALUES[
				`${shift.shift_name}_shift_end_time`] = getDateFromTime(shift.end_time_local);
		} else {
			DEFAULT_VALUES[`${shift.shift_name}_shift_start_time`] = undefined;
			DEFAULT_VALUES[`${shift.shift_name}_shift_end_time`] = undefined;
		}
	});

	return DEFAULT_VALUES;
}
