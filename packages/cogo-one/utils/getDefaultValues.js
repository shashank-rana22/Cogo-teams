const DUMMY_DATE = '2019-01-01';
const ALLOWED = ['morning', 'afternoon', 'night'];

export default function getDefaultValues({ list = [] }) {
	const DEFAULT_VALUES = {};

	list.forEach((shift) => {
		if (ALLOWED.includes(shift.shift_name) && shift.status === 'active') {
			DEFAULT_VALUES[
				`${shift.shift_name}_shift_start_time`] = new Date(`${DUMMY_DATE}T${shift.start_time_utc}Z`);
			DEFAULT_VALUES[
				`${shift.shift_name}_shift_end_time`] = new Date(`${DUMMY_DATE}T${shift.end_time_utc}Z`);
		} else {
			DEFAULT_VALUES[`${shift.shift_name}_shift_start_time`] = null;
			DEFAULT_VALUES[`${shift.shift_name}_shift_end_time`] = null;
		}
	});

	return DEFAULT_VALUES;
}
