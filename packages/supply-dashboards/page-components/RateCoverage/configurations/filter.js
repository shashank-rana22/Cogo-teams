import { useGetAsyncOptions } from '@cogoport/forms';
import { asyncFieldsLocations } from '@cogoport/forms/utils/getAsyncFields';
import { merge } from '@cogoport/utils';

const serviceOptions = [
	{
		label : 'FCL Freight',
		value : 'fcl_freight',
	},
	{
		label : 'LCL Freight',
		value : 'lcl_freight',
	},
	{
		label : 'Air Freight',
		value : 'air_freight',
	},
	{
		label : 'FCL Customs',
		value : 'fcl_customs',
	},
	{
		label : 'LCL Customs',
		value : 'lcl_customs',
	},
	{
		label : 'Air Customs',
		value : 'air_customs',
	},
	{
		label : 'Haulage',
		value : 'haulage_freight',
	},
	{
		label : 'FTL Transportation',
		value : 'ftl_freight',
	},
	{
		label : 'Trailer Transportation',
		value : 'trailer_freight',
	},
	{
		label : 'LTL Transportation',
		value : 'ltl_freight',
	},

	{
		label : 'FCL CFS',
		value : 'fcl_cfs',
	},
	{
		label : 'Additional Service',
		value : 'subsidiary',
	},
	{
		label : 'Rail Domestic Freight',
		value : 'rail_domestic_freight',
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
// const locationTypeMapping = {
// 	fcl_freight: ['country', 'seaport'],
// };

const containerSizeOptions = [];

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
		},
		{
			heading : 'Origin Country/Port Pair',
			name    : 'origin_country_id',
			...countryOptions1,
		},
		{
			heading : 'Destination Country/Port Pair',
			name    : 'destination_country_id',
			...countryOptions2,
		},
		{
			heading : 'Commodity Type',
			name    : 'commodity',
			options : commodityOptions,
		},
		{
			heading : 'Container Type',
			name    : 'container_type',
			options : containerTypeOptions,
		},

		{
			heading : 'Container Size',
			name    : 'container_size',
			options : containerSizeOptions,
		},

	];
	return controls;
};
export default Controls;
