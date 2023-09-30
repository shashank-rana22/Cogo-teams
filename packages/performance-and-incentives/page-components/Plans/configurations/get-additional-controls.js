import { Tooltip } from '@cogoport/components';
import { IcMInfo } from '@cogoport/icons-react';

const getAdditionalControls = ({ afterParameterOptions }) => ([
	{
		name        : 'customer_account_type',
		type        : 'select',
		label       : 'Account Type',
		placeholder : 'Select',
		options     : [{
			label : 'Cash',
			value : 'cash',
		},
		{
			label : 'Credit',
			value : 'credit',
		}],
		style: {
			parent_style: {
				flexBasis: '100%',
			},
			child_style: {
				width: '18%',
			},
		},
	},
	{
		name        : 'slab_attribute',
		type        : 'select',
		label       : 'Slab Attribute',
		placeholder : 'Select',
		options     : [{
			label : 'Shipment',
			value : 'shipment',
		},
		{
			label : 'Container',
			value : 'container',
		},
		{
			label : 'TEU',
			value : 'TEU',
		}],
		style: {
			parent_style: {
				flexBasis: '18%',
			},
			child_style: {
				width: '100%',
			},
		},
	},
	{
		name        : 'slab_lower_limit',
		type        : 'number',
		label       : 'Lower Limit',
		placeholder : 'Type',
		style       : {
			parent_style: {
				flexBasis: '18%',
			},
			child_style: {
				width: '100%',
			},
		},
	},
	{
		name        : 'slab_upper_limit',
		type        : 'number',
		label       : 'Upper Limit',
		placeholder : 'Type',
		style       : {
			parent_style: {
				flexBasis: '18%',
			},
			child_style: {
				width: '100%',
			},
		},
	},
	{
		name        : 'base_score',
		type        : 'number',
		label       : 'Base Score',
		placeholder : 'Type',
		style       : {
			parent_style: {
				flexBasis: '36%',
			},
			child_style: {
				width: '50%',
			},
		},
	},
	{
		name        : 'fixed_percentage_value',
		type        : 'number',
		label       : 'Fixed % of SID',
		placeholder : 'Type',
		style       : {
			parent_style: {
				flexBasis: '18%',
			},
			child_style: {
				width: '100%',
			},
		},
	},
	{
		name        : 'variable_percentage_value',
		type        : 'number',
		label       : 'Variable % post 1st SID',
		placeholder : 'Type',
		style       : {
			parent_style: {
				flexBasis: '18%',
			},
			child_style: {
				width: '100%',
			},
		},
	},
	{
		name : 'consideration_threshold',
		type : 'number',
		label:
	<div style={{ display: 'flex' }}>
		<div style={{ marginRight: '4px' }}>Consideration Threshold</div>
		{' '}
		<Tooltip
			content="To be considered after (nth shipment)"
			placement="top"
			maxWidth={500}
			interactive
		>
			<IcMInfo fill="#bf291e" width="12px" height="12px" cursor="pointer" />
		</Tooltip>
	</div>,
		placeholder : 'Type',
		style       : {
			parent_style: {
				flexBasis: '18%',
			},
			child_style: {
				width: '100%',
			},
		},
	},
	{
		name        : 'after_duration_threshold',
		type        : 'number',
		label       : 'Duration Threshold',
		placeholder : 'Type',
		style       : {
			parent_style: {
				flexBasis: '18%',
			},
			child_style: {
				width: '100%',
			},
		},
	},
	{
		name        : 'after_scoring_parameter_id',
		type        : 'select',
		label       : 'After parameter',
		placeholder : 'Select',
		value       : null,
		options     : afterParameterOptions,
		style       : {
			parent_style: {
				flexBasis: '36%',
			},
			child_style: {
				width: '100%',
			},
		},
	},
]);

export default getAdditionalControls;
