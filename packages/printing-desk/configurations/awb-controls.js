const NEGATIVE_CHECK_VALUE = 0;

const awbControls = (t) => [
	{
		name        : 'weight',
		placeholder : t('printingDesk:awb_controls_placeholder1'),
		label       : t('printingDesk:awb_controls_label1'),
		type        : 'number',
		span        : 6,
		rules       : {
			required : t('printingDesk:awb_controls_required1'),
			validate : (value) => (value < NEGATIVE_CHECK_VALUE ? t('printingDesk:awb_controls_validate1') : true),
		},
	},
	{
		name        : 'volumetricWeight',
		placeholder : t('printingDesk:awb_controls_placeholder2'),
		type        : 'number',
		label       : t('printingDesk:awb_controls_label2'),
		span        : 6,
		rules       : {
			required: t('printingDesk:awb_controls_required2'),
		},
	},
	{
		name        : 'chargeableWeight',
		placeholder : t('printingDesk:awb_controls_placeholder3'),
		label       : t('printingDesk:awb_controls_label3'),
		type        : 'number',
		span        : 6,
		rules       : {
			required : t('printingDesk:awb_controls_required3'),
			validate : (value) => (value < NEGATIVE_CHECK_VALUE ? t('printingDesk:awb_controls_validate1') : true),
		},
	},
	{
		name        : 'totalPackagesCount',
		placeholder : t('printingDesk:awb_controls_placeholder4'),
		label       : t('printingDesk:awb_controls_label4'),
		type        : 'number',
		span        : 6,
		disabled    : true,
		rules       : {
			required : t('printingDesk:awb_controls_required4'),
			validate : (value) => (value <= NEGATIVE_CHECK_VALUE ? t('printingDesk:awb_controls_validate2') : true),
		},
	},
	{
		name               : 'dimension',
		label              : t('printingDesk:awb_controls_label5'),
		type               : 'fieldArray',
		span               : 12,
		showButtons        : true,
		noDeleteButtonTill : 1,
		buttonText         : 'Add Dimension',
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
				placeholder : t('printingDesk:awb_controls_placeholder6'),
				label       : t('printingDesk:awb_controls_label6'),
				type        : 'number',
				span        : 2,
				rules       : {
					validate: (value) => (value < NEGATIVE_CHECK_VALUE
						? t('printingDesk:awb_controls_validate1') : true),
				},
			},
			{
				name        : 'width',
				placeholder : t('printingDesk:awb_controls_placeholder7'),
				label       : t('printingDesk:awb_controls_label7'),
				type        : 'number',
				span        : 2,
				rules       : {
					validate: (value) => (value < NEGATIVE_CHECK_VALUE
						? t('printingDesk:awb_controls_validate1') : true),
				},
			},
			{
				name        : 'height',
				placeholder : t('printingDesk:awb_controls_placeholder8'),
				label       : t('printingDesk:awb_controls_label8'),
				type        : 'number',
				span        : 2,
				rules       : {
					validate: (value) => (value < NEGATIVE_CHECK_VALUE
						? t('printingDesk:awb_controls_validate1') : true),
				},
			},
			{
				name        : 'packages_count',
				placeholder : t('printingDesk:awb_controls_placeholder9'),
				label       : t('printingDesk:awb_controls_label9'),
				type        : 'number',
				span        : 3,
				rules       : {
					validate: (value) => (value < NEGATIVE_CHECK_VALUE
						? t('printingDesk:awb_controls_validate1') : true),
				},
			}, {
				name        : 'unit',
				label       : t('printingDesk:awb_controls_label10'),
				type        : 'select',
				placeholder : t('printingDesk:awb_controls_placeholder10'),
				span        : 3,
				options     : [
					{ label: t('printingDesk:awb_controls_label11'), value: 'cms' },
					{ label: t('printingDesk:awb_controls_label12'), value: 'inch' },
				],
			},

		],
	},
];
export default awbControls;
