/* eslint-disable no-unused-vars */
/* eslint-disable custom-eslint/function-name-check */
import { useGetAsyncOptions } from '@cogoport/forms';
import { asyncFieldsLocations } from '@cogoport/forms/utils/getAsyncFields';
import { merge } from '@cogoport/utils';

const serviceOptions = [
	{
		label : 'FCL',
		value : 'fcl_freight',
	},
	{
		label : 'Air',
		value : 'air_freight',
	},
];

const commodityOptions = [
	{ label: 'General Cargo', value: 'general' },
	{ label: 'Special Consideration', value: 'special_consideration' },
	{ label: 'Temperature Controlled/Pharma', value: 'temp_controlled' },
	{ label: 'Other Special', value: 'other_special' }];

const containerTypeOptions = [
	{ label: 'Conventional End Opening', value: 'conventional_end_opening' },
	{ label: 'High Cube End Opening', value: 'high_cube_end_opening' },
	{ label: 'Side Access', value: 'side_access' },
	{ label: 'Refrigerated', value: 'refrigerated' },
	{ label: 'Flast Rack', value: 'flat_rack' },
	{ label: 'Flat Rack Collapsible', value: 'flat_rack_collapsible' },
	{ label: 'Platform', value: 'platform' },
	{ label: 'Open Top', value: 'open_top' },
	{ label: 'Tank', value: 'tank' },
];

const taskStatusOptions = [
	{
		label : 'Pending',
		value : 'pending',
	},
	{
		label : 'Completed',
		value : 'completed',
	},
	{
		label : 'Backlogs',
		value : 'backlogs',
	},
];

const Controls = () => {
	const countryOptions1 = useGetAsyncOptions(merge(asyncFieldsLocations(), {
		params: { filters: { type: ['country', 'seaport'] } },
	}));
	const countryOptions2 = useGetAsyncOptions(merge(asyncFieldsLocations(), {
		params: { filters: { type: ['country', 'seaport'] } },
	}));

	const controls = [
		{
			heading : 'Service',
			name    : 'service',
			options : serviceOptions,
			width   : '80px',
		},
		{
			heading     : 'Origin Country/Port Pair',
			name        : 'origin_country_id',
			placeholder : 'Country / Port Pair',
			width       : '200px',
			...countryOptions1,
		},
		{
			heading     : 'Destination Country/Port Pair',
			name        : 'destination_country_id',
			placeholder : 'Country / Port Pair',
			width       : '200px',
			...countryOptions2,
		},
		{
			heading     : 'Shipping Line',
			name        : 'shipping_line',
			options     : [],
			placeholder : 'Select Shipping Line',
			width       : '200px',
		},
		{
			heading     : 'Commodity Type',
			name        : 'commodity',
			options     : commodityOptions,
			placeholder : 'Select Commodity',
			width       : '200px',
		},
		{
			heading     : 'Task Status',
			name        : 'task_status',
			options     : taskStatusOptions,
			placeholder : 'Search here',
			width       : '200px',
		},
		// {
		// 	heading     : 'Date Range',
		// 	name        : 'task_status',
		// 	options     : [],
		// 	placeholder : 'Search here',
		// 	width       : '200px',
		// },
	];
	return controls;
};
export default Controls;
