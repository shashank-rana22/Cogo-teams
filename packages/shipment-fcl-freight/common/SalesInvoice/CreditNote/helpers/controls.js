import { startCase } from '@cogoport/utils';

const mainServices = [
	'fcl_freight_service',
	'lcl_freight_service',
	'air_freight_service',
];

const handleServiceType = (charge) => {
	const serviceType = charge?.display_name || charge?.service_type;

	if (!mainServices.includes(charge?.service_type)) {
		if (charge?.trade_type === 'export') {
			return `Origin ${startCase(serviceType)}`;
		}
		if (charge?.trade_type === 'import') {
			return `Destination ${startCase(serviceType)}`;
		}
	}

	return startCase(serviceType);
};

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
		options  : [],
		disabled : true,
		span     : 2,
	},
	{
		name           : 'currency',
		label          : 'Currency',
		type           : 'select',
		showOptional   : false,
		className      : 'size-sm',
		optionsListKey : 'currencies',
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
		render : (item) => <div style={{ marginTop: '5px' }}>{item?.total}</div>,
	},
];

const rawControls = (handleChange, charge, isEdit) => ({
	type             : 'edit_service_charges',
	name             : charge?.service_id,
	service_name     : charge?.display_name || charge?.service_type,
	showHeader       : true,
	showButtons      : false,
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
	controls: [...commonControls(handleChange, charge, isEdit)],
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
	handleChange = () => {},
	setAllChargeCodes = () => {},
	allChargeCodes = {},
	isEdit = false,
}) => {
	const control = services?.map((service) => ({
		...rawControls(handleChange, service, isEdit),
		onOptionsChange : (vals) => setAllChargeCodes({ ...allChargeCodes, ...vals }),
		value           : service?.line_items?.map((item) => ({
			is_checked       : item.is_checked,
			code             : item.code,
			sac_code         : item.hsn_code || 'NA',
			currency         : item.currency,
			price_discounted : item?.price_discounted || 0,
			quantity         : item?.quantity || 0,
			exchange_rate    : item?.exchange_rate || 1,
			tax_percent      : item?.tax_percent || 0,
			unit             : item.unit,
			total            : item?.tax_total_price_discounted || 0,
			name             : item?.name,
		})),
	}));

	control.push(...controls);

	return control;
};

export default creditNoteControls;
