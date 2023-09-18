import {
	commodityOptions,
	currencyOptions,
	densityCargoOptions,
	densityRatioOptions,
	flighOperationTypeOptions,
	handlingtypeOptions, packagingTypeOptions, priceTypeOptions, rateTypeOptions,
} from '../../../../configurations/helpers/constants';

import styles from './styles.module.css';

const airControls = ({
	data, listPartnerUserOptions, user_id, originLocationOptions, destinationLocationOptions,
	serviceProviders, listAirLineOptions,
}) => [
	{
		name        : 'rate_type',
		heading     : 'Rate type',
		placeholder : 'Select Rate Type',
		type        : 'select',
		options     : rateTypeOptions,
		span        : 4,
		value       : data?.rate_type,
		rules       : { required: 'rate type is required' },
	},
	{
		name        : 'origin_airport_id',
		heading     : 'Origin Airport',
		placeholder : 'Origin Location',
		type        : 'select',
		value       : data?.origin_airport?.id,
		disabled    : data?.origin_airport?.id,
		...originLocationOptions,
		span        : 4,
		rules       : { required: 'origin airport is required' },
	},
	{
		name        : 'destination_airport_id',
		heading     : 'Destination Airport',
		placeholder : 'Destination Location',
		type        : 'select',
		value       : data?.destination_airport?.id,
		disabled    : data?.destination_airport?.id,
		...destinationLocationOptions,
		span        : 4,
		rules       : { required: 'destination airport is required' },
	},
	{
		name        : 'service_provider_id',
		heading     : 'Service Provider',
		placeholder : 'Service Provider',
		type        : 'select',
		...serviceProviders,
		span        : 4,
		value       : data?.service_provider_id,
		rules       : { required: 'service provider is required' },
	},
	{
		name        : 'sourced_by_id',
		heading     : 'Rate Provided By LSP User',
		placeholder : 'Rate Provided By LSP User',
		type        : 'select',
		span        : 4,
		rules       : { required: 'sourced by is required' },
	},
	{
		name        : 'procured_by_id',
		heading     : 'Rate Procured by Cogoport Agent',
		placeholder : 'Rate Procured by Cogoport Agent',
		type        : 'select',
		...listPartnerUserOptions,
		value       : user_id,
		span        : 4,
		rules       : { required: 'procured by is required' },
	},
	{
		name        : 'commodity',
		heading     : 'Commodity',
		placeholder : 'Commodity',
		type        : 'select',
		value       : data?.commodity || 'general',
		disabled    : data?.commodity,
		options     : commodityOptions,
		span        : 4,
		rules       : { required: 'commodity is required' },
	},
	{
		name        : 'airline_id',
		heading     : 'Airline',
		placeholder : 'AirLine Line',
		type        : 'select',
		span        : 4,
		value       : data?.airline_id,
		...listAirLineOptions,
		rules       : { required: 'airline is required' },
	},
	{
		heading : 'Flight Operation Type',
		name    : 'flight_operation_type',
		type    : 'select',
		span    : 4,
		options : flighOperationTypeOptions,
		value   : data?.operation_type,
		rules   : { required: 'flight operation type is required' },
	},
	{
		heading   : 'Validity Start',
		name      : 'validity_start',
		type      : 'date_picker',
		className : styles.air_date_filter,
		span      : 4,
		rules     : { required: 'validity is required' },
	},
	{
		heading   : 'Validity End',
		name      : 'validity_end',
		type      : 'date_picker',
		className : styles.air_date_filter,
		span      : 4,
		rules     : { required: 'validity end is required' },
	},
	{
		heading : 'Packaging Type',
		name    : 'packaging_type',
		type    : 'select',
		span    : 4,
		options : packagingTypeOptions,
		value   : data?.shipment_type,
		rules   : { required: 'packaging type is required' },
	},
	{
		heading : 'Handling Type',
		name    : 'handling_type',
		type    : 'select',
		span    : 4,
		options : handlingtypeOptions,
		value   : data?.stacking_type,
		rules   : { required: 'handling type is required' },
	},
	{
		heading : 'Minimum Price',
		name    : 'minimum_price',
		span    : 4,
		type    : 'number',
		rules   : {
			required: 'min price is required',
		},
	},
	{
		heading : 'Currency',
		name    : 'currency',
		span    : 4,
		options : currencyOptions,
		type    : 'select',
		rules   : { required: 'currency is required' },
	},
	{
		heading : 'Price Type',
		name    : 'price_type',
		type    : 'select',
		options : priceTypeOptions,
		value   : data?.price_type,
		span    : 4,
		rules   : { required: 'price type is required' },
	},
	{
		heading  : 'Density Cargo',
		name     : 'density_cargo',
		type     : 'select',
		value    : data?.density_cargo || 'high_density',
		options  : densityCargoOptions,
		disabled : true,
		span     : 4,
		rules    : { required: 'density cargo is required' },
	},
	{
		heading     : 'Density Ratio',
		name        : 'density_ratio',
		value       : data?.density_ratio || '1_500',
		disabled    : true,
		span        : 4,
		options     : densityRatioOptions,
		type        : 'select',
		placeholder : 'Density Ratio',
		rules       : { required: 'density ratio is required' },
	},
	{
		name               : 'weight_slabs',
		type               : 'fieldArray',
		heading            : 'Weight Slabs',
		showButtons        : true,
		buttonText         : 'Add',
		noDeleteButtonTill : 1,
		controls           : [
			{
				name        : 'lower_limit',
				type        : 'number',
				placeholder : 'Lower Limit',
				disabled    : true,
				span        : 2,
			},
			{
				name        : 'upper_limit',
				type        : 'number',
				span        : 2,
				placeholder : 'Upper Limit',
			},
			{
				name        : 'price_per_unit',
				type        : 'number',
				placeholder : 'Price Per Unit',
				span        : 2,
			},
		],
	},
];
export default airControls;
