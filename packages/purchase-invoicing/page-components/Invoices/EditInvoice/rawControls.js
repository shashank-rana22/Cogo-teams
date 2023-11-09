import FCL_UNITS from '@cogoport/ocean-modules/constants/FCL_UNITS';
import { convertObjectMappingToArray } from '@cogoport/ocean-modules/utils/convertObjectMappingToArray';
import currencyCodeOptions from '@cogoport/ocean-modules/utils/currencyCode';
import { isEmpty, startCase } from '@cogoport/utils';

const MIN_ALIAS_LENGTH = 3;
const PRICE_GREATER_THAN = 0;

const handleDisableCond = (charge, isAdminSuperAdmin) => charge?.service_type === 'fcl_freight_service'
&& !isAdminSuperAdmin;

const rawControls = ({
	handleChange,
	charge = {},
	info = null,
	isAdminSuperAdmin,
	shipment_data = {},
	primary_service = {},
	index,
	TRADE_MAPPING = {},
}) => {
	const isFieldsDisabled = handleDisableCond(charge, isAdminSuperAdmin);
	const { id = '', shipment_type = '', entity_id = '' } = shipment_data || {};

	return {
		type             : 'edit_service_charges',
		name             : `${charge?.service_id}:${index}`,
		service_name     : charge?.service_type,
		showAddButtons   : true,
		shipment_id      : id,
		path             : 'cross_entity_purchase_invoice',
		shipment_type,
		entity_id,
		trade_type       : primary_service?.trade_type,
		showDeleteButton : true,
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
				span        : 2,
				handleChange,
				placeholder : 'Select Line Item',
				rules       : { required: 'Required' },
			},
			{

				type  : 'text',
				name  : 'alias',
				label : (
					<>
						Alias Name
						{' '}
						{info}
					</>
				),
				placeholder : 'Enter alias name/code',
				span        : 2,
				rules       : {
					validate: (v) => {
						if (isFieldsDisabled || isEmpty(v)) {
							return true;
						}
						return v?.length >= MIN_ALIAS_LENGTH || 'Characters should be >= 3';
					},
				},
			},
			{
				label   : 'Unit',
				type    : 'select',
				name    : 'unit',
				options : convertObjectMappingToArray(FCL_UNITS),
				span    : 2,
				rules   : { required: true },
			},
			{
				name         : 'currency',
				label        : 'Currency',
				type         : 'select',
				showOptional : false,
				options      : currencyCodeOptions,
				placeholder  : 'Select Currency',
				rules        : { required: true },
				span         : 1.5,
			},
			{
				label       : 'Price',
				name        : 'price_discounted',
				type        : 'number',
				placeholder : 'enter price',
				span        : 1.5,
				rules       : {
					required : true,
					validate : (v) => v > PRICE_GREATER_THAN || 'Price must be greater than 0',
				},
			},
			{
				label       : 'Quantity',
				name        : 'quantity',
				type        : 'number',
				placeholder : 'enter quantity',
				rules       : { required: true, min: 1 },
				span        : 1,
			},
			{
				label  : 'Amount (Tax Excl.)',
				type   : 'static',
				name   : 'total',
				render : (item) => <div style={{ marginLeft: '24px' }} className="amount-excl">{item?.total}</div>,
				span   : 2,
			},
		],
	};
};

export default rawControls;
