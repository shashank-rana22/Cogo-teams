const getFilterControls = () => {
	const controls = [
		{
			label    : 'Container Details',
			controls : [
				{
					name               : 'container',
					label              : 'Container',
					type               : 'field-array',
					buttonText         : 'Add Another Container',
					noDeleteButtonTill : 1,
					controls           : [
						{
							name    : 'container_type',
							label   : 'Type of Container',
							type    : 'chips',
							span    : 12,
							options : [
								{
									key      : 'standard',
									children : 'Standard (Dry)',
								},
								{
									key      : 'open_top',
									children : 'Open Top',
								},
								{
									key      : 'flat_rack',
									children : 'Flat Rack',
								},
								{
									key      : 'iso_tank',
									children : 'ISO Tank',
								},
								{
									key      : 'open_side',
									children : 'Open Side (One Door Open)',
								},
							],
							rules: { required: 'Container type is required' },
						},
						{
							label          : 'Select Commodity',
							name           : 'commodity',
							type           : 'select',
							optionsListKey : 'commodities',
							commodityType  : 'freight',
							isClearable    : true,
							span           : 12,
							rules          : { required: 'Commodity is required' },
						},
						{
							name     : 'total_weight',
							label    : 'Total Weight per Ctr.',
							subLabel : 'Max Weight = 26 MT. Overweight charges applicable after 20 MT.',
							// value       : 1,
							// max         : 30,
							// min         : 0.1,
							span     : 6,
							controls : [
								{
									name  : 'cargo_weight_per_container',
									type  : 'number',
									rules : { required: 'Weight is required' },
									value : 1,
									span  : 5,
								},
								{
									name        : 'weight_unit',
									type        : 'select',
									placeholder : 'Select Unit',
									value       : 'mt',
									span        : 6,
									options     : [
										{
											label : 'MT',
											value : 'mt',
										},
									],
									rules: { required: 'Weight is required' },
								},
							],
						},
						{
							name        : 'containers_count',
							label       : 'Count',
							type        : 'number',
							placeholder : 'Enter Count',
							max         : 1000,
							min         : 1,
							rules       : { required: 'Count is required' },
							span        : 5,
						},
						// {
						// 	name           : 'container_type_size',
						// 	label          : 'Container size',
						// 	type           : 'chips',
						// 	rules          : { required: 'Container size is required' },
						// 	optionsListKey : 'container-sizes',
						// },
					],
				},
			],
		},
		{
			label    : 'Detention & Demurrage Details',
			controls : [],
		},
		{
			label    : 'Operator Type',
			controls : [
				{
					name    : 'operator_type',
					type    : 'chips',
					options : [
						{
							key      : 'all',
							children : 'All',
						},
						{
							key      : 'shipping_line',
							children : 'Shipping Line',
						},
						{
							key      : 'nvocc',
							children : 'NVOCC',
						},
					],
				},
			],
		},
		{
			label    : 'Cargo Readiness Date',
			controls : [
				{
					name  : 'cargo_readiness_date',
					label : 'Pick a Date',
					type  : 'datepicker',
				},
			],
			showTimeSelect: true,
		},
		{
			label    : 'Rate Type',
			controls : [
				{
					name    : 'rate_type',
					type    : 'chips',
					options : [
						{
							key      : 'all',
							children : 'All',
						},
						{
							key      : 'system_rate',
							children : 'System Rate',
						},
						{
							key      : 'spot_booking',
							children : 'Spot Booking',
						},
					],
				},
			],
		},
		{
			label    : 'Payment Terms',
			controls : [
				{
					name    : 'payment_terms',
					type    : 'chips',
					options : [
						{
							key      : 'all',
							children : 'All',
						},
						{
							key      : 'prepaid',
							children : 'Prepaid',
						},
						{
							key      : 'collect',
							children : 'Collect',
						},
					],
				},
			],
		},
		{
			label    : 'Offers Available',
			controls : [
				{
					name    : 'offers',
					type    : 'chips',
					options : [
						{
							key      : 'all',
							children : 'All',
						},
						{
							key      : 'yes',
							children : 'Yes',
						},
						{
							key      : 'no',
							children : 'No',
						},
					],
				},
			],
		},
	];

	return controls;
};
export default getFilterControls;
