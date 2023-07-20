import AIR_UNITS from '@cogoport/air-modules/constants/AIR_UNITS';
import { convertObjectMappingToArray } from '@cogoport/air-modules/utils/convertObjectMappingToArray';

import { handleServiceType } from '../CreditNote/helpers/handleServiceType';

const commonControls = (handleChange, charge) => [
	{
		label    : handleServiceType(charge),
		type     : 'select',
		name     : 'code',
		span     : 3,
		handleChange,
		disabled : true,
		rules    : { required: 'Required' },
	},
	{
		label    : 'Unit',
		type     : 'select',
		name     : 'unit',
		options  : convertObjectMappingToArray(AIR_UNITS),
		disabled : true,
		span     : 2,
	},
	{
		name           : 'currency',
		label          : 'Currency',
		type           : 'select',
		showOptional   : false,
		className      : 'size-sm',
		optionsListKey : 'exchange-rate-currencies',
		placeholder    : 'Select Currency',
		disabled       : true,
		rules          : { required: 'currency is required' },
		span           : 2,
	},
	{
		label : 'Price',
		name  : 'price_discounted',
		type  : 'number',
		span  : 2,
		rules : { required: 'Required' },
	},
	{
		label : 'Quantity',
		name  : 'quantity',
		type  : 'number',
		rules : { required: 'Required', min: 1 },
		span  : 1,
	},
	{
		label  : 'Amount (Tax Excl.)',
		type   : 'static',
		name   : 'total',
		span   : 2,
		render : (item) => <div style={{ marginLeft: '24px' }}>{item?.total}</div>,
	},
];

const rawControls = (charge, isEdit) => ({
	type             : 'edit_service_charges',
	name             : charge?.service_id || charge?.id,
	service_name     : charge?.display_name || charge?.service_type,
	showHeader       : true,
	showAddButtons   : false,
	showDeleteButton : false,
	value            : !isEdit
		? [
			{
				is_checked       : '',
				code             : '',
				sac_code         : '',
				currency         : '',
				price_discounted : '',
				quantity         : '',
				exchange_rate    : '',
				tax              : '',
				total            : '',
			},
		]
		: [
			{
				code             : '',
				sac_code         : '',
				currency         : '',
				price_discounted : '',
				quantity         : '',
				exchange_rate    : '',
				tax              : '',
				total            : '',
			},
		],
	controls: !isEdit
		? [
			{
				name    : 'is_checked',
				type    : 'checkbox',
				options : [
					{
						label : '',
						value : 'true',
					},
				],
				themeType : 'primary lg',
				span      : 1,
			},
			...commonControls(charge, isEdit),
		]
		: [...commonControls(charge, isEdit)],
});

const controls = [
	{
		name        : 'remarks',
		type        : 'textarea',
		placeholder : 'Enter Details Here',
		label       : 'Details (Mandatory)',
		span        : 12,
		rules       : { required: 'Remarks is required' },
	},
	{
		label    : 'Upload File',
		name     : 'uploadDocument',
		span     : 12,
		type     : 'file',
		multiple : true,
		rules    : { required: 'This field is required' },
	},
];

const creditNoteControls = ({
	services = [],
	isEdit = false,
}) => {
	const control = services?.map((service) => ({
		...rawControls(service, isEdit),
		value: service?.line_items?.map((item) => {
			const {
				is_checked,
				code,
				hsn_code = 'NA',
				currency,
				price_discounted = 0,
				quantity = 0,
				exchange_rate = 1,
				tax_percent = 0,
				unit,
				tax_total_price_discounted = 0,
				sac_code,
				total,
				name,
			} = item || {};

			return {
				is_checked,
				code,
				sac_code,
				currency,
				price_discounted,
				quantity,
				exchange_rate,
				tax_percent,
				unit,
				total,
				name,
				tax_total_price_discounted,
				hsn_code,
			};
		}),
	}));

	control.push(...controls);
	return control;
};
export default creditNoteControls;
