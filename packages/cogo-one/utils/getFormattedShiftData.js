import { getDateFromTime } from './getDateFromTime';

const ALLOWED = ['morning', 'afternoon', 'night'];

function getFormattedShiftData({ list = [] }) {
	let defaultValues = {};

	list.forEach(
		(shift) => {
			if (ALLOWED.includes(shift.shift_name) && shift.status === 'active') {
				defaultValues = {
					...defaultValues,
					[`${shift.shift_name}_shift_start_time`]: (
						shift?.start_time_utc
							? getDateFromTime({
								timeStr  : shift?.start_time_utc,
								timeZone : shift?.local_time_zone,
							})
							: null
					),
					[`${shift.shift_name}_shift_end_time`]: (
						shift?.end_time_utc
							? getDateFromTime({
								timeStr  : shift?.end_time_utc,
								timeZone : shift?.local_time_zone,
							})
							: null
					),
				};
			}
		},
	);

	return defaultValues;
}

export default getFormattedShiftData;
