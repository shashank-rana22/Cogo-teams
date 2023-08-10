import FCL_UNITS from '@cogoport/ocean-modules/constants/FCL_UNITS';
import { convertObjectMappingToArray } from '@cogoport/ocean-modules/utils/convertObjectMappingToArray';
import currencyCodeOptions from '@cogoport/ocean-modules/utils/currencyCode';
import { startCase, isEmpty } from '@cogoport/utils';

const MIN_ALIAS_LENGTH = 3;
const PRICE_GREATER_THAN = 0;

const rawControls = (
	handleChange,
	charge,
	info,
	isAdminSuperAdmin,
	shipment_data,
	index,
	TRADE_MAPPING = {},
) => ({
	type         : 'edit_service_charges',
	name         : `${charge?.service_id}:${index}`,
	service_name : charge?.service_type,
	showHeader   : true,
	showButtons  : true,
	value        : [
		{
			code             : '',
			alias            : '',
			sac_code         : '',
			currency         : '',
			price_discounted : 0,
			quantity         : 0,
			exchange_rate    : 0,
			tax              : 0,
			total            : 0,
			name             : '',
		},
	],
	controls: [
		{
			label: startCase(
				`${
					(`${shipment_data?.shipment_type}_service` !== charge?.service_type
						&& TRADE_MAPPING[charge?.trade_type])
					|| ''
				} - ${charge?.service_type}`,
			),
			type        : 'select',
			name        : 'code',
			span        : 2,
			handleChange,
			placeholder : 'select line item',
			disabled    : !isAdminSuperAdmin,
			rules       : { required: 'Required' },
		},
		{

			type  : 'text',
			name  : 'alias',
			label : (
				<>
					<div>Alias Name</div>
					{info}
				</>
			),
			placeholder : 'Enter alias name/code',
			rules       : {
				validate: (v) => v?.length >= MIN_ALIAS_LENGTH || isEmpty(v) || 'Characters should be >= 3',
			},
			disabled : !isAdminSuperAdmin,
			span     : 2,
		},
		{
			label    : 'Unit',
			type     : 'select',
			name     : 'unit',
			options  : convertObjectMappingToArray(FCL_UNITS),
			disabled : !isAdminSuperAdmin,
			span     : 2,
		},
		{
			name         : 'currency',
			label        : 'Currency',
			type         : 'select',
			showOptional : false,
			options      : currencyCodeOptions,
			placeholder  : 'Select Currency',
			rules        : { required: 'currency is required' },
			span         : 1.5,
			disabled     : !isAdminSuperAdmin,
		},
		{
			label       : 'Price',
			name        : 'price_discounted',
			type        : 'number',
			placeholder : 'enter price',
			span        : 1.5,
			rules       : {
				required : 'Price is Required',
				validate : (v) => v > PRICE_GREATER_THAN || 'Price must be greater than 0',
			},
			disabled: !isAdminSuperAdmin,
		},
		{
			label       : 'Quantity',
			name        : 'quantity',
			type        : 'number',
			placeholder : 'enter quantity',
			rules       : { required: 'Required', min: 1 },
			span        : 1,
			disabled    : !isAdminSuperAdmin,
		},
		{
			label  : 'Amount (Tax Excl.)',
			type   : 'static',
			name   : 'total',
			render : (item) => <div style={{ marginLeft: '24px' }} className="amount-excl">{item?.total}</div>,
			span   : 2,
		},
	],
});

export default rawControls;
