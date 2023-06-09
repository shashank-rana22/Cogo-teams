import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import FCL_UNITS from '@cogoport/ocean-modules/contants/FCL_UNITS';
import { convertObjectMappingToArray } from '@cogoport/ocean-modules/utils/convertObjectMappingToArray';
import { startCase, isEmpty } from '@cogoport/utils';

const INITIAL_STATE = 0;
const LENGTH_CUTOFF = 3;

const handleDisableCond = (charge, isAdminSuperAdmin, shipment_data) => {
	const disable =	 !isAdminSuperAdmin	&& shipment_data?.serial_id > GLOBAL_CONSTANTS.serial_check_id;
	return disable;
};

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
			disabled:
				handleDisableCond(charge, isAdminSuperAdmin, shipment_data),
			rules: { required: 'Required' },
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
				validate: (v) => v?.length >= LENGTH_CUTOFF || isEmpty(v) || 'Characters should be >= 3',
			},
			disabled : handleDisableCond(charge, isAdminSuperAdmin, shipment_data),
			span     : 2,
		},
		{
			label    : 'Unit',
			type     : 'select',
			name     : 'unit',
			options  : convertObjectMappingToArray(FCL_UNITS),
			disabled : handleDisableCond(charge, isAdminSuperAdmin, shipment_data),
			span     : 2,
		},
		{
			name           : 'currency',
			label          : 'Currency',
			type           : 'select',
			showOptional   : false,
			optionsListKey : 'exchange-rate-currencies',
			placeholder    : 'Select Currency',
			rules          : { required: 'currency is required' },
			span           : 1.5,
			disabled:
				handleDisableCond(charge, isAdminSuperAdmin, shipment_data),
		},
		{
			label       : 'Price',
			name        : 'price_discounted',
			type        : 'number',
			placeholder : 'enter price',
			span        : 1.5,
			rules       : {
				required : 'Price is Required',
				validate : (v) => v > INITIAL_STATE || 'Price must be greater than 0',
			},
			disabled: handleDisableCond(charge, isAdminSuperAdmin, shipment_data),
		},
		{
			label       : 'Quantity',
			name        : 'quantity',
			type        : 'number',
			placeholder : 'enter quantity',
			rules       : { required: 'Required', min: 1 },
			span        : 1,
			disabled:
				handleDisableCond(charge, isAdminSuperAdmin, shipment_data),
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
