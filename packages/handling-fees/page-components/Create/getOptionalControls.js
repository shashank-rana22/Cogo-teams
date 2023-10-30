import { isEmpty } from '@cogoport/utils';

import BOOKING_SOURCE_MAPPING from '../../configs/BOOKING_SOURCE_MAPPING.json';
import RATE_TYPE from '../../configs/RATE_TYPE.json';

const ORGANIZATION_SUBTYPES_MAPPING = {
	importer_exporter: [
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
	channel_partner: [
		{
			label : 'Overseas CP',
			value : 'overseas_cp',
		},
		{
			label : 'Domestic CP',
			value : 'domestic_cp',
		},
	],
};

const getOptionalControls = ({
	activeService = '',
	data = {},
	formValues = {},
	setValue = () => { },
}) => {
	const isUpdatable = !isEmpty(data);

	const {
		cogo_entity_id,
		organization_sub_type,
		booking_source,
		organization_type,
		rate_source,
		trade_type,
		serviceable_country_id,
	} = data?.data || {};

	const organizationSubTypeOptions = ORGANIZATION_SUBTYPES_MAPPING[formValues
		?.organization_type || 'importer_exporter'];

	return [
		{
			label          : 'Cogo Entity',
			name           : 'cogo_entity_id',
			valueKey       : 'id',
			type           : 'async_select',
			placeholder    : 'Select Cogo Entity',
			asyncKey       : 'list_cogo_entity',
			initialCall    : true,
			labelKey       : 'business_name',
			isClearable    : true,
			value          : cogo_entity_id,
			defaultOptions : true,
			disabled       : isUpdatable,
			span           : 2,
			size           : 'sm',
			rules          : { required: 'Cogo Entity is Required.' },
		},
		{
			name        : 'serviceable_country_id',
			label       : 'Country',
			type        : 'async_select',
			initialCall : true,
			asyncKey    : 'list_locations',
			params      : {
				filters: { type: ['country'] },
			},
			defaultOptions : true,
			value          : serviceable_country_id,
			placeholder    : 'Select Country',
			span           : 2,
			disabled       : isUpdatable,
			size           : 'sm',
		},
		{
			name        : 'booking_source',
			label       : 'Booking Source',
			type        : 'select',
			placeholder : 'Select Booking Source',
			value       : booking_source,
			disabled    : isUpdatable,
			options     : BOOKING_SOURCE_MAPPING,
			span        : 2,
			isClearable : true,
			size        : 'sm',
		},
		{
			label       : 'Rate Type',
			name        : 'rate_source',
			type        : 'select',
			placeholder : 'Select Rate Type',
			value       : rate_source,
			size        : 'sm',
			disabled    : isUpdatable,
			options     : RATE_TYPE[activeService] || [],
			span        : 2,
			isClearable : true,
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
			span        : 2,
			isClearable : true,
			value       : organization_type,
			disabled    : isUpdatable,
			size        : 'sm',
			onChange    : () => {
				setValue('organization_sub_type', '');
			},
		},
		{
			name        : 'organization_sub_type',
			label       : 'Organisation Sub-Type',
			type        : 'select',
			placeholder : 'Select Org Sub Type',
			span        : 2,
			options     : organizationSubTypeOptions,
			isClearable : true,
			value       : organization_sub_type,
			disabled    : isUpdatable,
			size        : 'sm',
		},
		{
			name        : 'trade_type',
			label       : 'Trade Type',
			type        : 'select',
			placeholder : 'Select Trade Type',
			span        : 2,
			options     : [
				{ label: 'Import', value: 'import' },
				{ label: 'Export', value: 'export' },
				{ label: 'Domestic', value: 'domestic' },
				{ label: 'Cross country', value: 'cross_country' },
			],
			isClearable : true,
			value       : trade_type,
			disabled    : isUpdatable,
			size        : 'sm',
		},
	];
};

export default getOptionalControls;
