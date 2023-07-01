import PercentagePercentile from './PercentagePercentile';

const getControls = ({ control, formvalues }) => [
	{
		name    : 'users_list',
		label   : 'Select Users to appear for Retest',
		type    : 'radio',
		options : [
			{ value: 'all', label: 'All' },
			{ value: 'custom', label: 'On the basis of Test' },
		],
		value : 'custom',
		rules : {
			required: 'Users selection is required',
		},
	},
	{
		label     : 'Select Users on the Basis of Test',
		name      : 'filtered_users',
		type      : 'checkboxgroup',
		show      : formvalues.users_list === 'custom',
		className : 'channels_field_controller',
		multiple  : true,
		style     : {
			display    : 'flex',
			flexShrink : 1,
			marginLeft : '0px',
		},
		options: [
			{
				label: (
					<PercentagePercentile formvalues={formvalues} control={control} value="percentile_checked" />
				),
				value    : 'percentile_checked',
				disabled : formvalues.filtered_users?.includes('percentage_checked'),
			},
			{
				label: (
					<PercentagePercentile formvalues={formvalues} control={control} value="percentage_checked" />
				),
				value    : 'percentage_checked',
				disabled : formvalues.filtered_users?.includes('percentile_checked'),
			},
			{ label: 'Not appeared', value: 'not_appeared' },
		],
	},
	{
		name    : 'is_percentile_editable',
		label   : 'Allow edits to Published Percentile',
		type    : 'radio',
		options : [
			{ value: 'true', label: 'Yes' },
			{ value: 'false', label: 'No' },
		],
		rules: {
			required: 'is percentile editable is required',
		},
	},
	{
		name           : 'test_validity',
		label          : 'Retest Validity',
		type           : 'date-picker',
		showTimeSelect : true,
		rules          : { required: 'This is required' },
		style          : {
			paddingTop: '6px',
		},
	},
];

export default getControls;
