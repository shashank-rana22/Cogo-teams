import FTL_UNITS from '@cogoport/surface-modules/contants/FTL_UNITS';
import { convertObjectMappingToArray } from '@cogoport/surface-modules/utils/convertObjectMappingToArray';
import { startCase, isEmpty } from '@cogoport/utils';

const handleDisableCond = (charge, isFclFreight, shipment_data) => {
	const disable =	charge?.service_type === 'fcl_freight_service' && !isFclFreight
	&& shipment_data?.serial_id > 130000;

	return disable;
};

const rawControls = (
	handleChange,
	charge,
	info,
	isFclFreight,
	shipment_data,
	index,
	trade_mapping = {},
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
						&& trade_mapping[charge?.trade_type])
					|| ''
				} - ${charge?.service_type}`,
			),
			type        : 'select',
			name        : 'code',
			span        : 2,
			handleChange,
			placeholder : 'select line item',
			disabled:
				handleDisableCond(charge, isFclFreight, shipment_data),
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
				validate: (v) => v?.length >= 3 || isEmpty(v) || 'Characters should be >= 3',
			},
			disabled : handleDisableCond(charge, isFclFreight, shipment_data),
			span     : 2,
		},
		{
			label   : 'Unit',
			type    : 'select',
			name    : 'unit',
			options : convertObjectMappingToArray(FTL_UNITS),
			span    : 2,
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
				handleDisableCond(charge, isFclFreight, shipment_data),
		},
		{
			label       : 'Price',
			name        : 'price_discounted',
			type        : 'number',
			placeholder : 'enter price',
			span        : 1.5,
			rules       : {
				required : 'Price is Required',
				validate : (v) => v > 0 || 'Price must be greater than 0',
			},
			disabled: handleDisableCond(charge, isFclFreight, shipment_data),
		},
		{
			label       : 'Quantity',
			name        : 'quantity',
			type        : 'number',
			placeholder : 'enter quantity',
			rules       : { required: 'Required', min: 1 },
			span        : 1,
			disabled:
				handleDisableCond(charge, isFclFreight, shipment_data),
		},
		{
			label  : 'Amount (Tax Excl.)',
			type   : 'static',
			name   : 'total',
			render : (item) => <div style={{ marginTop: '5px' }} className="amount-excl">{item?.total}</div>,
			span   : 2,
		},
	],
});

export default rawControls;
