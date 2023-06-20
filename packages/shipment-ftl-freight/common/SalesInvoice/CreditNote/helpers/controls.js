import FTL_UNITS from '@cogoport/surface-modules/constants/FTL_UNITS';
import { convertObjectMappingToArray } from '@cogoport/surface-modules/utils/convertObjectMappingToArray';

import { handleServiceType } from './handleServiceType';

const DEFAULT_PRICE = 0;
const DEFAULT_QUANTITY = 0;
const DEFAULT_EXCHANGE_RATE = 1;
const DEFAULT_TAX_PERCENT = 0;
const DEFAULT_TOTAL = 0;
const commonControls = (service) => [
	{
		label    : handleServiceType(service),
		type     : 'select',
		name     : 'code',
		span     : 3,
		disabled : true,
		rules    : { required: 'Required' },
	},
	{
		label    : 'Unit',
		type     : 'select',
		name     : 'unit',
		options  : convertObjectMappingToArray(FTL_UNITS),
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

const rawControls = (service) => ({
	type             : 'edit_service_charges',
	name             : service?.id,
	service_name     : service?.display_name || service?.service_type,
	showHeader       : true,
	showAddButtons   : false,
	showDeleteButton : false,
	value            : [
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
	controls: [...commonControls(service)],
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
		label : 'Upload File',
		name  : 'uploadDocument',
		span  : 12,
		type  : 'file',
		rules : { required: 'This field is required' },
	},
];

const creditNoteControls = ({
	services = [],
}) => {
	const control = services?.map((service) => ({
		...rawControls(service),
		value: service?.line_items?.map((item) => ({
			is_checked       : item?.is_checked,
			code             : item?.code,
			sac_code         : item?.hsn_code || 'NA',
			currency         : item?.currency,
			price_discounted : item?.price_discounted || DEFAULT_PRICE,
			quantity         : item?.quantity || DEFAULT_QUANTITY,
			exchange_rate    : item?.exchange_rate || DEFAULT_EXCHANGE_RATE,
			tax_percent      : item?.tax_percent || DEFAULT_TAX_PERCENT,
			unit             : item?.unit,
			total            : item?.tax_total_price_discounted || DEFAULT_TOTAL,
			name             : item?.name,
		})),
	}));

	control.push(...controls);

	return control;
};

export default creditNoteControls;
