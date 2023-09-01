import containerTypes from '@cogoport/constants/container-types.json';

const getControls = ({ item = {} }) => {
	const commoditiesValue = Object.keys(item?.commodities || {}).map((key) => ({
		container_type : key,
		commodity      : item?.commodities?.[key],
	}));

	const emptyCommodity = [{
		container_type : '',
		commodity      : '',
	}];

	return [
		{
			name        : 'name',
			label       : 'Name',
			type        : 'text',
			span        : 7,
			value       : item?.name,
			className   : 'primary lg',
			placeholder : 'Enter Cluster Name...',
			rules       : { required: 'This is required' },
		},
		{
			name               : 'commodities',
			type               : 'fieldArray',
			showButtons        : true,
			buttonText         : 'Add Commodities',
			noDeleteButtonTill : 2,
			span               : 12,
			value              : commoditiesValue.length ? commoditiesValue : emptyCommodity,
			controls           : [
				{
					name        : 'container_type',
					type        : 'select',
					span        : 5,
					placeholder : 'Container Type',
					rules       : { required: 'This is required' },
					options     : containerTypes,
				},
				{
					type         : 'multi_select',
					span         : 5,
					name         : 'commodity',
					placeholder  : 'Commodity',
					rules        : { required: 'This is required' },
					options      : [],
					options_key  : 'commodity_list',
					form_key     : 'container_type',
					freight_type : 'freight',
				},
			],
		},
	];
};

export default getControls;
