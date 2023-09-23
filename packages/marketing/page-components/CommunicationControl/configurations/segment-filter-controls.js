import CATEGORIES_OPTIONS from '../constants/CATEGORIES_OPTIONS.json';
import CHANNEL_OPTIONS from '../constants/CHANNEL_OPTIONS.json';

const controls = [
	{
		label       : 'Segment',
		name        : 'segmentation_id',
		type        : 'async_select',
		asyncKey    : 'segments',
		initialCall : true,
		placeholder : 'Select Segment',
		valueKey    : 'id',
		span        : 12,
		labelKey    : 'name',
		size        : 'sm',
	},
	{
		label       : 'Category',
		name        : 'category',
		type        : 'select',
		placeholder : 'select',
		size        : 'sm',
		span        : 12,
		options     : CATEGORIES_OPTIONS,
	},
	{
		label       : 'Channel Type',
		name        : 'channel_type',
		type        : 'select',
		placeholder : 'select',
		size        : 'sm',
		span        : 12,
		options     : CHANNEL_OPTIONS,
	},
	{
		label       : 'Action',
		name        : 'actions',
		type        : 'select',
		placeholder : 'select',
		size        : 'sm',
		span        : 12,
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
