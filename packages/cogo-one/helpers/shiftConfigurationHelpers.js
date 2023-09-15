export const compareTime = ({ start_time, end_time }) => {
	if (start_time && end_time
		&& (Number(start_time.getHours()) <= Number(end_time.getHours()))
		&& (
			Number(start_time.getHours()) !== Number(end_time.getHours())
			|| Number(start_time.getMinutes()) <= Number(end_time.getMinutes())
		)
	) { return true; }
	return false;
};

export 	const transformShiftData = ({ val, list = [] }) => {
	const NEW_OBJ = {};
	Object.entries(val).forEach(([key, time]) => {
		const [shift_name, time_key] = key.split('_shift_');
		NEW_OBJ[shift_name] = {
			...NEW_OBJ[shift_name],
			shift_name,
			[`${time_key}_local`]: time,
		};
	});
	(list || []).forEach((itm) => {
		const { id: shiftId, shift_name = '' } = itm || {};
		if (shift_name in NEW_OBJ) {
			NEW_OBJ[shift_name].shift_id = shiftId;
		}
	});
	return Object.values(NEW_OBJ);
};

export const validateTime = ({ start_time, end_time }) => {
	if (!start_time && !end_time) {
		return true;
	}
	if (
		!compareTime({ start_time, end_time })
	) {
		return false;
	}
	return true;
};
