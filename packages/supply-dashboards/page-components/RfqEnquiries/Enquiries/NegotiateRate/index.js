import { useForm } from '@cogoport/forms';

import Layout from '../../Layout';

const fields = [
	{
		name        : 'cluster_name',
		type        : 'select',
		span        : 3,
		placeholder : 'Type here...',
		label       : 'Cluster Name',
		className   : 'primary lg',
		rules       : {
			required: 'This is Required',
		},
	},
	{
		name        : 'cluster_name',
		type        : 'select',
		span        : 5,
		placeholder : 'Type here...',
		label       : 'Cluster Name',
		className   : 'primary lg',
		rules       : {
			required: 'This is Required',
		},
	},
	{
		name        : 'cluster_name',
		type        : 'select',
		span        : 2,
		placeholder : 'Type here...',
		label       : 'Cluster Name',
		className   : 'primary lg',
		rules       : {
			required: 'This is Required',
		},
	},
	{
		name        : 'cluster_type',
		type        : 'select',
		span        : 4,
		placeholder : 'Select here...',
		label: (
			''
		),
		className : 'primary lg',
		options   : [
			{
				label : 'Manual',
				value : 'manual',
			},
			{
				label : 'Radius',
				value : 'radius_wise',
			},
			{
				label : 'Port to ICD',
				value : 'port_to_icd',
			},
		],
		rules: {
			required: 'This is Required',
		},
	},
	{
		name        : 'radius',
		type        : 'select',
		span        : 4,
		placeholder : 'Enter in km ...',
		label       : 'Radius',
		className   : 'primary lg',
		rules       : {
			required: 'This is Required',
		},
	},
	{
		name        : 'location_type',
		type        : 'select',
		span        : 4,
		placeholder : 'Select here...',
		label: (
			''
		),
		className   : 'primary lg',
		theme       : 'admin',
		isClearable : true,
		options     : [
			{
				label : 'Pincode',
				value : 'pincode',
			},
			{
				label : 'Seaport',
				value : 'seaport',
			},
			{
				label : 'Airport',
				value : 'airport',
			},
			{
				label : 'Country',
				value : 'country',
			},
			{
				label : 'City',
				value : 'city',
			},
			{
				label : 'Region',
				value : 'region',
			},
			{
				label : 'Trade',
				value : 'trade',
			},
			{
				label : 'Warehouse',
				value : 'warehouse',
			},
			{
				label : 'Railway Terminal',
				value : 'railway_terminal',
			},
		],
	},
	{
		name        : 'reference_location_id',
		type        : 'select',
		span        : 4,
		isClearable : true,
		placeholder : 'Select here...',
		label: (
			''
		),
		optionsListKey: 'list_locations',
	},
	{
		name           : 'city_id',
		type           : 'select',
		placeholder    : 'Select here...',
		span           : 4,
		label          : 'City',
		isClearable    : true,
		optionsListKey : 'list_locations',
		params         : { filters: { type: ['city'] } },
	},
	{
		name           : 'country_id',
		type           : 'select',
		placeholder    : 'Select here...',
		span           : 4,
		label          : 'Country',
		isClearable    : true,
		optionsListKey : 'list_locations',
		params         : { filters: { type: ['country'] } },
	},
	{
		name           : 'region_id',
		type           : 'select',
		placeholder    : 'Select here...',
		span           : 4,
		label          : 'Region',
		isClearable    : true,
		optionsListKey : 'list_locations',
		params         : { filters: { type: ['region'] } },
	},
	{
		label          : 'Organization',
		name           : 'organization_id',
		placeholder    : 'Select here...',
		span           : 4,
		isClearable    : true,
		type           : 'select',
		className      : 'primary lg',
		optionsListKey : 'organizations',
	},
	{
		label          : 'Partner',
		name           : 'partner_id',
		placeholder    : 'Select here...',
		span           : 4,
		type           : 'select',
		isClearable    : true,
		className      : 'primary lg',
		optionsListKey : 'partners',
	},
	{
		name           : 'location_ids',
		type           : 'select',
		placeholder    : 'Select here...',
		label          : 'Selected Locations ',
		optionsListKey : 'list_locations',
		span           : 4,
		multiple       : true,
		caret          : true,
		rules          : {
			required: 'This is Required',
		},
	},
	{
		name               : 'tags',
		type               : 'fieldArray',
		showButtons        : true,
		label              : 'Tags',
		buttonText         : 'Add Tag',
		value              : [{ tag: '' }],
		noDeleteButtonTill : 1,
		controls           : [
			{
				label     : 'Tag',
				name      : 'tag',
				className : 'primary lg',
				span      : 4,
				type      : 'text',
			},
		],
	},
	{
		name               : 'container_slabs',
		type               : 'fieldArray',
		showButtons        : true,
		buttonText         : 'Add Container Count Wise BAS Slabs',
		noDeleteButtonTill : 0,
		controls           : [
			{
				name         : 'lower_limit',
				type         : 'select',
				placeholder  : 'Lower Limit',
				label        : 'Lower Limit',
				span         : 4,
				showOptional : false,
				className    : 'primary lg',
				rules        : { required: 'This is required', min: 1 },
			},
			{
				name         : 'upper_limit',
				type         : 'select',
				span         : 3,
				label        : 'Lower Limit',
				placeholder  : 'Upper Limit',
				showOptional : false,
				className    : 'primary lg',
				rules        : { required: 'This is required', min: 1 },
			},
			{
				name           : 'currency',
				placeholder    : 'Currency',
				type           : 'select',
				label          : 'Lower Limit',
				optionsListKey : 'currencies',
				span           : 2,
				showOptional   : false,
				className      : 'primary lg',
				rules          : { required: 'This is required' },
			},
			{
				name         : 'price',
				placeholder  : 'Enter Price',
				type         : 'select',
				span         : 2,
				label        : 'Lower Limit',
				showOptional : false,
				className    : 'primary lg',
				rules        : { required: 'This is required' },
			},
		],
	},
];

function NegotiateRate() {
	const { control } = useForm();
	return (
		<Layout fields={fields} control={control} />
	);
}
export default NegotiateRate;
