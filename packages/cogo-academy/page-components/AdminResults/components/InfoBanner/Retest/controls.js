import { Tooltip } from '@cogoport/components';
import { InputController } from '@cogoport/forms';
import { IcMInfo } from '@cogoport/icons-react';

const getControls = ({ control, formvalues }) => {
	const controls = [
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
			options   : [
				{
					label:
	<>
		<InputController
			name="percentile"
			placeholder="Type Percentile"
			control={control}
			size="sm"
			type="number"
			disabled={!formvalues.filtered_users?.includes('percentile_checked')}
		/>
		<Tooltip
			theme="light"
			content="Type Minimum Percentile for retest eligibilty"
			maxWidth="none"
			placement="right"
			interactive
		>

			<IcMInfo style={{ marginLeft: 8 }} />

		</Tooltip>

	</>,
					value    : 'percentile_checked',
					disabled : formvalues.filtered_users?.includes('percentage_checked'),
				},
				{
					label:
	<>
		<InputController
			name="percentage"
			placeholder="Type Percentage"
			control={control}
			size="sm"
			type="number"
			disabled={!formvalues.filtered_users?.includes('percentage_checked')}
		/>
		<Tooltip
			theme="light"
			content="Type Minimum Percentage for retest eligibilty"
			maxWidth="none"
			placement="right"
			interactive
		>
			<IcMInfo style={{ marginLeft: 8 }} />

		</Tooltip>

	</>,
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
		},
	];
	return controls;
};

export default getControls;
