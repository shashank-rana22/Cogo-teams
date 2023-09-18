import { getDateFromTime } from './getDateFromTime';

const ALLOWED = ['morning', 'afternoon', 'night'];

export default function getDefaultValues({ list = [] }) {
	let defaultValues = {
		morning_shift_start_time   : null,
		morning_shift_end_time     : null,
		afternoon_shift_start_time : null,
		afternoon_shift_end_time   : null,
		night_shift_start_time     : null,
		night_shift_end_time       : null,
	};

	list.forEach(
		(shift) => {
			if (ALLOWED.includes(shift.shift_name) && shift.status === 'active') {
				defaultValues = {
					...defaultValues,
					[`${shift.shift_name}_shift_start_time`]: (
						shift?.start_time_utc
							? getDateFromTime(shift.start_time_utc) : null
					),
					[`${shift.shift_name}_shift_end_time`]: (
						shift?.end_time_utc
							? getDateFromTime(shift.end_time_utc) : null
					),
				};
			}
		},
	);

	return defaultValues;
}
