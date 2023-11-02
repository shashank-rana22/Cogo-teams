import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { addDays } from '@cogoport/utils';

const editScheduleControl = ({ watch = () => {} }) => {
	const { start_date, end_date, end_time, start_time } = watch();

	return {
		start_date: {
			name        : 'start_date',
			isClearable : true,
			minDate     : new Date(),
			placeholder : 'Start Date',
			dateFormat  : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
			rules       : {
				validate: (value) => (value > end_date ? 'Cannot be greater than end time' : true),
			},
		},
		start_time: {
			name       : 'start_time',
			timeFormat : GLOBAL_CONSTANTS.formats.time['HH:mm aaa'],
		},
		end_date: {
			name                  : 'end_date',
			placeholder           : 'End Date',
			minDate               : start_date,
			maxDate               : addDays(new Date(start_date), 1),
			dateFormat            : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
			isPreviousDaysAllowed : true,
			rules                 : {
				validate: (value) => (
					(
						(value && (value?.getDate() === start_date?.getDate()) && end_time < start_time)
					)
						? 'Cannot be less than start time' : true),
			},
		},
		end_time: {
			name       : 'end_time',
			timeFormat : GLOBAL_CONSTANTS.formats.time['HH:mm aaa'],
		},
	};
};

export default editScheduleControl;
