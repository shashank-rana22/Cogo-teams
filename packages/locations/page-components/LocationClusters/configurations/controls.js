import InfoLocationType from '../common/InfoLocationType';

const controls = [
	{
		name        : 'cluster_name',
		type        : 'text',
		span        : 4,
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
		label       : (
			<InfoLocationType
				heading="Cluster Type"
				// eslint-disable-next-line max-len
				content="Basis of grouping locations 1.Radius Wise - All locations inside that radius 2. Port to ICD - All ICD ports mapped to that main port 3. Manual - Any group of locations"
			/>
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
		type        : 'number',
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
		label       : (
			<InfoLocationType
				heading="Location Type"
				content="Type of locations you want to group together / leave blank if mixed location types"
			/>
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
			{
				label : 'Continent',
				value : 'continent',
			},
		],
	},
	{
		name        : 'reference_location_id',
		type        : 'async_select',
		span        : 4,
		isClearable : true,
		placeholder : 'Select here...',
		label       : (
			<InfoLocationType
				heading="Reference Location"
				// eslint-disable-next-line max-len
				content="1. It's the location point from where radius circumference is to be calculated in case of radius cluster. 2. Select the main port whose ICD's you want to add in case of port to ICD"
			/>
		),
		asyncKey: 'list_locations',
	},
	{
		name        : 'city_id',
		type        : 'async_select',
		placeholder : 'Select here...',
		span        : 4,
		label       : 'City',
		isClearable : true,
		asyncKey    : 'list_locations',
		params      : { filters: { type: ['city'] } },
	},
	{
		name        : 'country_id',
		type        : 'async_select',
		placeholder : 'Select here...',
		span        : 4,
		label       : 'Country',
		isClearable : true,
		asyncKey    : 'list_locations',
		params      : { filters: { type: ['country'] } },
	},
	{
		name        : 'region_id',
		type        : 'async_select',
		placeholder : 'Select here...',
		span        : 4,
		label       : 'Region',
		isClearable : true,
		asyncKey    : 'list_locations',
		params      : { filters: { type: ['region'] } },
	},
	{
		label       : 'Organization',
		name        : 'organization_id',
		placeholder : 'Select here...',
		span        : 4,
		isClearable : true,
		type        : 'async_select',
		className   : 'primary lg',
		asyncKey    : 'list_organizations',
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
		name        : 'location_ids',
		type        : 'async_select',
		placeholder : 'Select here...',
		label       : 'Selected Locations for Clustering',
		asyncKey    : 'list_locations',
		span        : 4,
		initialCall : true,
		multiple    : true,
		caret       : true,
		rules       : {
			required: 'This is Required',
		},
	},
	{
		label : 'Tags',
		span  : 12,
	},
	{
		name               : 'tags',
		type               : 'fieldArray',
		showButtons        : true,
		label              : 'Tags',
		buttonText         : 'Add Tag',
		value              : [{ tag: '' }],
		noDeleteButtonTill : 1,
		initialCall        : true,
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
];

export default controls;
