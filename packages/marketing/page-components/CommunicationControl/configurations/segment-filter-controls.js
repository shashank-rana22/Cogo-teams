import CATEGORIES_OPTIONS from '../constants/CATEGORIES_OPTIONS.json';
import CHANNEL_OPTIONS from '../constants/CHANNEL_OPTIONS.json';

const COMMON_CONTROL = {
	size        : 'sm',
	isClearable : true,
	span        : 12,
	type        : 'select',
};

const controls = [
	{
		...COMMON_CONTROL,
		label       : 'Segment',
		name        : 'segmentation_id',
		type        : 'async_select',
		asyncKey    : 'segments',
		initialCall : true,
		placeholder : 'Select Segment',
		valueKey    : 'id',
		labelKey    : 'name',

	},
	{
		...COMMON_CONTROL,
		label       : 'Category',
		name        : 'category',
		placeholder : 'Select Category',
		size        : 'sm',
		span        : 12,
		options     : CATEGORIES_OPTIONS,
		isClearable : true,
	},
	{
		...COMMON_CONTROL,
		label       : 'Channel Type',
		name        : 'channel_type',
		type        : 'select',
		placeholder : 'Select Channel Type',
		options     : CHANNEL_OPTIONS,
	},
	{
		...COMMON_CONTROL,
		label       : 'Action',
		name        : 'actions',
		placeholder : 'Select ACTIONS',
		options     : [
			{
				label : 'DND',
				value : 'dnd',
			},
			{
				label : 'Stop',
				value : 'stop',
			},
		],
	},
];

export default controls;
