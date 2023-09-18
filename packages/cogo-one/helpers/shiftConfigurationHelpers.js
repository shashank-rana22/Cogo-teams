import { isValid } from '@cogoport/utils';

export const transformShiftData = ({ newData = {}, savedData = [] }) => {
	const UPDATED_DATA = {};

	Object.entries(newData).forEach(
		([key, time]) => {
			const [shift_name, time_key] = key.split('_shift_');

			UPDATED_DATA[shift_name] = {
				...UPDATED_DATA[shift_name],
				shift_name,
				[`${time_key}_local`]: time,
			};
		},
	);

	(savedData || []).forEach((itm) => {
		const {
			id: shiftId,
			shift_name = '',
		} = itm || {};

		if (shift_name in UPDATED_DATA) {
			UPDATED_DATA[shift_name].shift_id = shiftId;
		}
	});

	return Object.values(UPDATED_DATA);
};

export const validateTime = ({
	startTime = null,
	endTime = null,
}) => {
	if (!isValid(startTime) && !isValid(endTime)) {
		return true;
	}

	if (isValid(startTime) && isValid(endTime)
		&& (Number(startTime.getHours()) <= Number(endTime.getHours()))
		&& (
			Number(startTime.getHours()) !== Number(endTime.getHours())
			|| Number(startTime.getMinutes()) <= Number(endTime.getMinutes())
		)
	) {
		return true;
	}

	return false;
};
