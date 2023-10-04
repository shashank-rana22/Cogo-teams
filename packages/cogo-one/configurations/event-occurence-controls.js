import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';

const eventOccurenceControls = ({ frequencyType = '', startDateField = {}, watch = () => {} }) => {
	const { start_date, end_date } = watch();

	const controls = [
		{
			label                 : 'Start Date',
			name                  : 'start_date',
			isClearable           : true,
			minDate               : startDateField,
			dateFormat            : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
			showTimeSelect        : false,
			isPreviousDaysAllowed : true,
			controlType           : 'datePicker',
			show                  : ['daily', 'weekly', 'monthly', 'yearly', 'custom'],
			rules                 : {
				required : '*required',
				validate : (value) => (value > end_date ? 'Cannot be greater than end time' : true),
			},
		},
		{
			label       : 'Repeat On',
			name        : 'weekly_repeat_on',
			controlType : 'multi-select',
			multiple    : true,
			rules       : { required: '*required' },
			options     : GLOBAL_CONSTANTS.days_with_value,
			show        : ['weekly'],
		},
		{
			label       : 'On date',
			name        : 'month_on_date',
			min         : 0,
			max         : 31,
			placeholder : 'Enter Date',
			controlType : 'number',
			step        : 1,
			arrow       : false,
			rules       : { required: '*required' },
			show        : ['monthly'],
		},
		{
			label         : 'Repeat On',
			name          : 'yearly_repeated_on',
			controlType   : 'input-group',
			inputControls : [
				{
					label       : '',
					name        : 'yearly_month',
					controlType : 'select',
					placeholder : 'select',
					rules       : { required: '*required' },
					options     : GLOBAL_CONSTANTS.months_with_value,
					style       : { marginRight: '8px' },
				},
				{
					label       : '',
					name        : 'yearly_on_date',
					min         : 0,
					max         : 31,
					placeholder : 'Date',
					controlType : 'number',
					step        : 1,
					arrow       : false,
					rules       : { required: '*required' },
				},
			],
			show: ['yearly'],
		},
		{
			label         : 'Repeat On',
			name          : 'custom_repeated_on',
			controlType   : 'input-group',
			inputControls : [
				{
					label       : '',
					name        : 'custom_day',
					controlType : 'select',
					value       : 'day',
					disabled    : true,
					options     : [{ label: 'Day', value: 'day' }],
					style       : { marginRight: '8px' },
				},
				{
					label       : '',
					name        : 'custom_on_date',
					min         : 0,
					placeholder : 'Date',
					max         : 31,
					controlType : 'number',
					step        : 1,
					arrow       : false,
					rules       : { required: '*required' },
				},
			],
			show: ['custom'],
		},
		{
			label                 : 'End Date',
			name                  : 'end_date',
			isClearable           : true,
			minDate               : start_date,
			dateFormat            : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
			showTimeSelect        : false,
			isPreviousDaysAllowed : true,
			shouldCloseOnSelect   : true,
			controlType           : 'datePicker',
			show                  : ['daily', 'weekly', 'monthly', 'yearly', 'custom'],
			rules                 : {
				required : '*required',
				validate : (value) => (value < start_date ? 'Cannot be greater than start time' : true),
			},
		},
	];

	return controls?.filter((eachItem) => eachItem?.show?.includes(frequencyType));
};

export default eventOccurenceControls;
