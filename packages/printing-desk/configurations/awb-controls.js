const NEGATIVE_CHECK_VALUE = 0;

const awbControls = ({ t = () => {} }) => [
	{
		name        : 'weight',
		placeholder : t('printingDesk:awb_controls_gross_weight_placeholder'),
		label       : t('printingDesk:awb_controls_gross_weight_label'),
		type        : 'number',
		span        : 6,
		rules       : {
			required : t('printingDesk:awb_controls_gross_weight_required'),
			validate : (value) => (value < NEGATIVE_CHECK_VALUE
				? t('printingDesk:awb_controls_cannot_be_negative_validation') : true),
		},
	},
	{
		name        : 'volumetricWeight',
		placeholder : t('printingDesk:awb_controls_vol_weight_placeholder'),
		type        : 'number',
		label       : t('printingDesk:awb_controls_vol_weight_label'),
		span        : 6,
		rules       : {
			required: t('printingDesk:awb_controls_vol_weight_required'),
		},
	},
	{
		name        : 'chargeableWeight',
		placeholder : t('printingDesk:awb_controls_chargeable_weight_placeholder'),
		label       : t('printingDesk:awb_controls_chargeable_weight_label'),
		type        : 'number',
		span        : 6,
		rules       : {
			required : t('printingDesk:awb_controls_chargeable_weight_required'),
			validate : (value) => (value < NEGATIVE_CHECK_VALUE
				? t('printingDesk:awb_controls_cannot_be_negative_validation') : true),
		},
	},
	{
		name        : 'totalPackagesCount',
		placeholder : t('printingDesk:awb_controls_package_count_placeholder'),
		label       : t('printingDesk:awb_controls_package_count_label'),
		type        : 'number',
		span        : 6,
		disabled    : true,
		rules       : {
			required : t('printingDesk:awb_controls_package_count_required'),
			validate : (value) => (value <= NEGATIVE_CHECK_VALUE
				? t('printingDesk:awb_controls_should_be_greater_than_0_validation') : true),
		},
	},
	{
		name               : 'dimension',
		label              : t('printingDesk:awb_controls_dimension_label'),
		type               : 'fieldArray',
		span               : 12,
		showButtons        : true,
		noDeleteButtonTill : 1,
		buttonText         : t('printingDesk:awb_controls_dimension_button_text'),
		value              : [
			{
				length  : '',
				width   : '',
				height  : '',
				package : '',
				unit    : '',
			},
		],
		controls: [
			{
				name        : 'length',
				placeholder : t('printingDesk:awb_controls_length_placeholder'),
				label       : t('printingDesk:awb_controls_length_label'),
				type        : 'number',
				span        : 2,
				rules       : {
					validate: (value) => (value < NEGATIVE_CHECK_VALUE
						? t('printingDesk:awb_controls_cannot_be_negative_validation') : true),
				},
			},
			{
				name        : 'width',
				placeholder : t('printingDesk:awb_controls_width_placeholder'),
				label       : t('printingDesk:awb_controls_width_label'),
				type        : 'number',
				span        : 2,
				rules       : {
					validate: (value) => (value < NEGATIVE_CHECK_VALUE
						? t('printingDesk:awb_controls_cannot_be_negative_validation') : true),
				},
			},
			{
				name        : 'height',
				placeholder : t('printingDesk:awb_controls_height_placeholder'),
				label       : t('printingDesk:awb_controls_height_label'),
				type        : 'number',
				span        : 2,
				rules       : {
					validate: (value) => (value < NEGATIVE_CHECK_VALUE
						? t('printingDesk:awb_controls_cannot_be_negative_validation') : true),
				},
			},
			{
				name        : 'packages_count',
				placeholder : t('printingDesk:awb_controls_packages_count_placeholder'),
				label       : t('printingDesk:awb_controls_no_of_packages_label'),
				type        : 'number',
				span        : 3,
				rules       : {
					validate: (value) => (value < NEGATIVE_CHECK_VALUE
						? t('printingDesk:awb_controls_cannot_be_negative_validation') : true),
				},
			}, {
				name        : 'unit',
				label       : t('printingDesk:awb_controls_unit_label'),
				type        : 'select',
				placeholder : t('printingDesk:awb_controls_unit_placeholder'),
				span        : 3,
				options     : [
					{ label: t('printingDesk:awb_controls_cm_label'), value: 'cms' },
					{ label: t('printingDesk:awb_controls_inch_label'), value: 'inch' },
				],
			},

		],
	},
];
export default awbControls;
