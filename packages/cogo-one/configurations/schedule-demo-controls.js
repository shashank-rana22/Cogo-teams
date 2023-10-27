import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { addDays } from '@cogoport/utils';

const ADD_DAY = 1;

const getScheduleControls = ({ scheduleType = '', watch = () => {} }) => {
	const { start_date, end_date, end_time, start_time } = watch();

	const controls = [
		{
			name           : 'validity_start',
			label          : 'Demo Date',
			controlType    : 'datePicker',
			width          : '100%',
			showTimeSelect : true,
			disabled       : true,
			type           : ['demo'],
		},
		{
			name        : 'subject',
			label       : 'Subject',
			controlType : 'input',
			placeholder : 'Type subject here...',
			width       : '100%',
			disabled    : scheduleType === 'demo',
			type        : ['demo', 'organic'],
			rules       : { required: scheduleType === 'organic' },
		},
		{
			name        : 'description',
			label       : 'Description',
			controlType : 'textArea',
			placeholder : 'Type description here...',
			width       : '100%',
			disabled    : scheduleType === 'demo',
			type        : ['demo', 'organic'],
			rules       : { required: scheduleType === 'organic' },
		},
		{
			name                  : 'start_date',
			label                 : 'Start Date',
			isClearable           : true,
			placeholder           : 'Start Date',
			showTimeSelect        : false,
			dateFormat            : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
			type                  : ['organic'],
			controlType           : 'datePicker',
			shouldCloseOnSelect   : true,
			isPreviousDaysAllowed : false,
			rules                 : {
				validate: (value) => (value > end_date ? 'Cannot be greater than end date' : true),
			},
		},
		{
			name        : 'start_time',
			label       : 'Start Time',
			isClearable : true,
			placeholder : 'start time',
			timeFormat  : GLOBAL_CONSTANTS.formats.time['hh:mm aaa'],
			type        : ['organic'],
			controlType : 'timePicker',

		},
		{
			name                  : 'end_date',
			label                 : 'End Date',
			isClearable           : true,
			minDate               : start_date,
			maxDate               : addDays(new Date(start_date), ADD_DAY),
			placeholder           : 'Start Date',
			showTimeSelect        : false,
			dateFormat            : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
			type                  : ['organic'],
			controlType           : 'datePicker',
			shouldCloseOnSelect   : true,
			isPreviousDaysAllowed : true,
			rules                 : {
				validate: (value) => (((value.getDate() === start_date.getDate() && end_time < start_time))
					? 'Cannot be less than start time' : true),
			},
		},
		{
			name        : 'end_time',
			label       : 'End Time',
			isClearable : true,
			placeholder : 'End time',
			timeFormat  : GLOBAL_CONSTANTS.formats.time['hh:mm aaa'],
			type        : ['organic'],
			controlType : 'timePicker',

		},
	];

	return controls.filter((item) => item?.type?.includes(scheduleType));
};
export default getScheduleControls;
