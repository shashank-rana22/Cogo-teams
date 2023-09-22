import AIR_UNITS from '@cogoport/air-modules/constants/AIR_UNITS';
import currencies from '@cogoport/air-modules/helpers/currencies';
import { convertObjectMappingToArray } from '@cogoport/air-modules/utils/convertObjectMappingToArray';
import { startCase } from '@cogoport/utils';

const PRICE_GREATER_THAN = 0;

const handleDisableCond = (shipment_type, isRoleAllowed) => shipment_type === 'air_freight' && !isRoleAllowed;

const rawControls = (
	handleChange,
	charge,
	info,
	isRoleAllowed,
	shipment_data,
	index,
	TRADE_MAPPING = {},
) => {
	const { shipment_type = 'air_freight' } = shipment_data || {};

	return ({
		type             : 'edit_service_charges',
		name             : `${charge?.service_id}:${index}`,
		service_name     : charge?.service_type,
		shipment_id      : charge?.detail?.shipment_id,
		showHeader       : true,
		showButtons      : true,
		showDeleteButton : isRoleAllowed,
		showAddButtons   : isRoleAllowed,
		value            : [
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
				span        : 2.5,
				handleChange,
				placeholder : 'select line item',
				disabled:
				handleDisableCond(shipment_type, isRoleAllowed),
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
				span        : 2,
			},
			{
				label    : 'Unit',
				type     : 'select',
				name     : 'unit',
				options  : convertObjectMappingToArray(AIR_UNITS),
				disabled : handleDisableCond(shipment_type, isRoleAllowed),
				span     : 2,
			},
			{
				name        : 'currency',
				label       : 'Currency',
				type        : 'select',
				options     : currencies,
				placeholder : 'Select Currency',
				rules       : { required: 'currency is required' },
				span        : 1.5,
				disabled:
				handleDisableCond(shipment_type, isRoleAllowed),
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
			},
			{
				label       : 'Quantity',
				name        : 'quantity',
				type        : 'number',
				placeholder : 'enter quantity',
				rules       : { required: 'Required', min: 1 },
				span        : 1,
				disabled:
				handleDisableCond(shipment_type, isRoleAllowed),
			},
			{
				label  : 'Amount (Tax Excl.)',
				type   : 'static',
				name   : 'total',
				render : (item) => <div style={{ marginLeft: '24px' }} className="amount-excl">{item?.total}</div>,
				span   : 1.4,
			},
			{
				name : 'name',
				span : 0.1,
			},
		],
	});
};

export default rawControls;
