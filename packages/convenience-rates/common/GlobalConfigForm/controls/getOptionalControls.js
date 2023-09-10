import { isEmpty } from '@cogoport/utils';

import BOOKING_SOURCE_MAPPING from '../../../configs/BOOKING_SOURCE_MAPPING.json';
import COMMODITY_MAPPING from '../../../configs/COMMODITY_MAPPING.json';

const OPTIONS = [
	{ label: 'User', value: 'user' },
	{ label: 'Agent', value: 'agent' },
];

const getOptionalControls = ({
	activeService,
	service,
	data,
}) => {
	const isUpdatable = !isEmpty(data);
	const {
		organization_sub_type,
		commodity,
		performed_by,
		booking_source,
		organization_type,
	} = data || {};
	// console.log(data)
	return [
		{
			label          : 'Cogo Entity',
			name           : 'cogo_entity_id',
			type           : 'async_select',
			placeholder    : 'Select Cogo Entity',
			asyncKey       : 'list_cogo_entity',
			initialCall    : true,
			labelKey       : 'business_name',
			renderLabel    : (item) => `${item?.business_name}`,
			isClearable    : true,
			valueKey       : 'entity_code',
			defaultOptions : true,
			// disabled       : isUpdatable,
			span           : 2.5,
			size           : 'sm',
			rules          : { required: 'Cogo Entity is Required.' },
		},
		{
			name        : 'performed_by',
			label       : 'Checkout created by',
			type        : 'select',
			placeholder : 'Select Performed By',
			options     : OPTIONS,
			value       : performed_by,
			disabled    : isUpdatable,
			span        : 2.5,
			isClearable : true,
			size        : 'sm',
		},
		{
			name        : 'booking_source',
			label       : 'Booking Source',
			type        : 'select',
			placeholder : 'Select Booking Source',
			value       : booking_source,
			disabled    : isUpdatable,
			options     : BOOKING_SOURCE_MAPPING,
			span        : 2.5,
			isClearable : true,
			size        : 'sm',
		},
		{
			name        : 'organization_type',
			label       : 'Organisation Type',
			type        : 'select',
			placeholder : 'Select Org Type',
			options     : [
				{ label: 'Importer Exporter', value: 'importer_exporter' },
				{ label: 'Channel Partner', value: 'channel_partner' },
			],
			span        : 2.5,
			isClearable : true,
			value       : organization_type,
			disabled    : isUpdatable,
			size        : 'sm',
		},
		{
			name        : 'organization_sub_type',
			label       : 'Organisation Sub-Type/Segment',
			type        : 'select',
			placeholder : 'Select Org Sub Type',
			span        : 2.5,
			options     : [
				{
					label : 'Long Tail',
					value : 'long_tail',
				},
				{
					label : 'Mid Size',
					value : 'mid_size',
				},
				{
					label : 'Enterprise',
					value : 'enterprise',
				},
			],
			isClearable : true,
			value       : organization_sub_type,
			disabled    : isUpdatable,
			size        : 'sm',
		},
		{
			name        : 'commodity',
			label       : 'Commodity',
			type        : 'select',
			placeholder : 'Select Rate Type',
			value       : commodity,
			disabled    : isUpdatable,
			options     : COMMODITY_MAPPING[activeService || service],
			span        : 2.5,
			isClearable : true,
			size        : 'sm',
		},
	];
};

export default getOptionalControls;
