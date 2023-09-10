/* eslint-disable max-lines-per-function */
import getGeoConstants from '@cogoport/globalization/constants/geo';

import getOptions from '../../../../configs/COMMODITY_MAPPING';
import currencyOptions from '../../../../constants/currencies';

const geo = getGeoConstants();

const MAX_WEIGHT = 18;

const getControls = ({ item }) => [
	{
		label          : 'Service Provider',
		name           : 'service_provider_id',
		placeholder    : 'Search via name',
		type           : 'async_select',
		value          : item?.service_provider_id,
		className      : 'primary lg',
		optionsListKey : 'verified-service-providers',
		asyncKey       : 'organizations',
		initialCall    : true,
		defaultOptions : true,
		isClearable    : true,
		span           : 4,
		showForScope   : ['partner'],
		showIfMissing  : true,
		showOptional   : false,
		params         : {
			filters: {
				exclude_ids: [
					geo.uuid.cogo_freight_supplier,
					geo.uuid.cogo_freight_pvt_ltd_pr_supplier,
				],
				account_type : 'service_provider',
				status       : 'active',
				kyc_status   : 'verified',
			},
		},
	},
	{
		label          : 'Trade Type',
		name           : 'trade_type',
		placeholder    : 'Select...',
		optionsListKey : 'trade-types',
		type           : 'select',
		span           : 4,
		rules          : { required: 'This is required' },
		value          : item?.trade_type,
		className      : 'primary lg',
		caret          : true,
		options      		: [
			{
				label : 'Export',
				value : 'export',
			},
			{
				label : 'Import',
				value : 'import',
			},
		],
	},

	{
		label          : 'Select any organization',
		name           : 'importer_exporter_id',
		type           : 'async_select',
		value          : item?.importer_exporter_id,
		className      : 'primary lg',
		span           : 4,
		showOptional   : false,
		optionsListKey : 'verified-importer-exporters',
		asyncKey       : 'organizations',
		scope          : ['partner'],
		placeholder    : 'Select...',
		params         : {
			filters: {
				account_type : 'importer_exporter',
				status       : 'active',
				kyc_status   : 'verified',
			},
		},
	},
	{
		name         : 'origin_location_type',
		type         : 'select',
		span         : 3,
		value        : item?.origin_location_type,
		showOptional : false,
		placeholder  : 'Select here...',
		label        : 'Origin Location Type',
		className    : 'primary lg',
		theme        : 'admin',
		isClearable  : true,
		options      : [
			{
				label : 'Seaport',
				value : 'seaport',
			},
			{
				label : 'Country',
				value : 'country',
			},
		],
	},
	{
		name           : 'origin_location_id',
		label          : 'Origin Location',
		type           : 'async_select',
		span           : 3,
		showOptional   : false,
		value          : item?.origin_location_id,
		asyncKey       : 'list_locations',
		className      : 'primary lg',
		optionsListKey : 'locations',
		placeholder    : 'Search via name',
		params         : {
			filters    : { status: 'active' },
			page_limit : 20,
			sort_by    : 'name',
			sort_type  : 'asc',
			includes   : { country: true, default_params_required: true },
		},
	},
	{
		name         : 'destination_location_type',
		type         : 'select',
		span         : 3,
		value        : item?.destination_location_type,
		placeholder  : 'Select here...',
		showOptional : false,
		label        : 'Destination Location Type',
		className    : 'primary lg',
		theme        : 'admin',
		isClearable  : true,
		options      : [
			{
				label : 'Seaport',
				value : 'seaport',
			},
			{
				label : 'Country',
				value : 'country',
			},
		],
	},
	{
		name           : 'destination_location_id',
		label          : 'Destination Location',
		type           : 'async_select',
		span           : 3,
		showOptional   : false,
		value          : item?.destination_location_id,
		className      : 'primary lg',
		optionsListKey : 'locations',
		asyncKey       : 'list_locations',
		placeholder    : 'Search via name',
		params         : {
			filters    : { status: 'active' },
			page_limit : 20,
			sort_by    : 'name',
			sort_type  : 'asc',
			includes   : { country: true, default_params_required: true },
		},
	},
	{
		name           : 'shipping_line_id',
		label          : 'Shipping Line',
		type           : 'async_select',
		span           : 3,
		showOptional   : false,
		value          : item?.shipping_line_id,
		className      : 'primary lg',
		optionsListKey : 'shipping-lines',
		asyncKey       : 'list_operators',
		placeholder    : 'Search via name',
		params         : {
			filters    : { operator_type: 'shipping_line', status: 'active' },
			page_limit : 100,
			sort_by    : 'short_name',
			sort_type  : 'asc',
		},
	},
	{
		label          : 'Container Size',
		name           : 'container_size',
		type           : 'select',
		span           : 3,
		showOptional   : false,
		value          : item?.container_size,
		className      : 'primary lg',
		placeholder    : 'Size',
		optionsListKey : 'container-sizes',
		options        : [
			{
				label : '20ft',
				value : '20',
			},
			{
				label : '40ft',
				value : '40',
			},
			{
				label : '40ft HC',
				value : '40HC',
			},
			{
				label : '45ft HC',
				value : '45HC',
			},
		],

	},
	{
		label        : 'Organization Category',
		name         : 'organization_category',
		type         : 'select',
		span         : 3,
		showOptional : false,
		value        : item?.organization_category,
		options      : [
			{
				label : 'Airline',
				value : 'airline',
			},
			{
				label : 'Shipping Line',
				value : 'shipping_line',
			},
			{
				label : 'Shipper',
				value : 'shipper',
			},
			{
				label : 'Freight Forwarder',
				value : 'freight_forwarder',
			},
			{
				label : 'Customs Service Provider',
				value : 'customs_service_provider',
			},
			{
				label : 'Transporter',
				value : 'transporter',
			},
			{
				label : 'Nvocc',
				value : 'nvocc',
			},
			{
				label : 'Overseas Agent',
				value : 'overseas_agent',
			},
			{
				label : 'Iata Agents',
				value : 'iata_agents',
			},
			{
				label : 'Cfs',
				value : 'cfs',
			},
			{
				label : 'Courier',
				value : 'courier',
			},
			{
				label : 'Consolidator',
				value : 'consolidator',
			},
			{
				label : 'Warehouse',
				value : 'warehouse',
			},
			{
				label : 'Internal',
				value : 'internal',
			},
			{
				label : 'Rail',
				value : 'rail',
			},
			{
				label : 'Attached leased transporter',
				value : 'attached_leased',
			},
			{
				label : 'Cogoport mituj transporter',
				value : 'cogoport_mituj',
			},
			{
				label : 'Third party logistics vendor',
				value : 'third_party_logistics_vendor',
			},
			{
				label : 'Other',
				value : 'other',
			},
		],
		className   : 'primary lg',
		placeholder : 'Type here...',
	},
	{
		label         : 'Commodity',
		name          : 'commodity',
		type          : 'select',
		span          : 3,
		showOptional  : false,
		value         : item?.commodity,
		placeholder   : 'Search via name',
		className     : 'primary lg',
		commodityType : 'freight',
		options       : getOptions({ containerType: 'standard' }),
	},
	{
		name        : 'max_weight',
		label       : 'Free Limit',
		type        : 'number',
		lowerlabel  : 'In Metricton (MT)',
		span        : 4,
		value       : item?.max_weight || MAX_WEIGHT,
		className   : 'primary lg',
		placeholder : 'Enter',
		rules       : { required: 'This is required' },
	},
	{
		name               : 'slabs',
		type               : 'fieldArray',
		noDeleteButtonTill : 0,
		buttonText         : '',
		initialCount       : 0,
		value              : item.slabs,
		controls           : [
			{
				name        : 'lower_limit',
				label       : 'Lower Limit',
				key         : 'lower_limit',
				type        : 'number',
				placeholder : 'Enter Lower Limit',
				span        : 2,
				className   : 'primary lg',
				rules       : {
					required: 'Lower Limit is required',
				},
			},
			{
				name        : 'upper_limit',
				label       : 'Upper Limit',
				key         : 'upper_limit',
				type        : 'number',
				placeholder : 'Enter Upper Limit',
				span        : 2,
				className   : 'primary lg',
				rules       : {
					required: 'Upper Limit is required',
				},
			},
			{
				name           : 'currency',
				label          : 'Currency',
				key            : 'currency',
				type           : 'select',
				optionsListKey : 'currencies',
				span           : 3.5,
				value          : item?.currency,
				className      : 'primary lg',
				placeholder    : 'Select',
				options        : currencyOptions,
				rules          : { required: 'This is required' },
			},
			{
				name         : 'price',
				label        : 'Price',
				key          : 'price',
				type         : 'number',
				span         : 3.5,
				value        : item?.price,
				showOptional : false,
				className    : 'primary lg',
				placeholder  : 'Enter',
				rules        : { required: 'This is required' },
			},
		],
	},
];
export default getControls;
