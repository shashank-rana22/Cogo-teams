import AIR_UNITS from '@cogoport/air-modules/constants/AIR_UNITS';
import { convertObjectMappingToArray } from '@cogoport/air-modules/utils/convertObjectMappingToArray';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { startCase } from '@cogoport/utils';

const DEFAULT_VALUE_FOR_NULL_HANDLING = 0;
const DECIMAL_PLACE = 2;
const getEditQuotationControls = ({ service_charge, shipment_data, handleChange }) => {
	const { id, service_type, service_detail, trade_type } = service_charge || {};

	return {
		type             : 'edit_service_charges',
		name             : id,
		service_name     : service_type,
		shipment_id      : shipment_data?.id,
		showAddButtons   : false,
		showDeleteButton : false,
		cargoDetails     : service_detail?.[GLOBAL_CONSTANTS.zeroth_index],
		value            : [{
			code     : '',
			currency : '',
			price    : '',
			quantity : '',
			unit     : '',
			total    : '',
		}],
		controls: [
			{
				label       : startCase(`${trade_type || ''} - ${service_type || ''}`),
				type        : 'select',
				name        : 'code',
				span        : 3,
				size        : 'sm',
				rules       : { required: true },
				renderLabel : (item) => {
					handleChange(item);
					return `${item.code} - ${item.name}`;
				},
			},
			{
				label          : 'Currency',
				name           : 'currency',
				type           : 'select',
				optionsListKey : 'exchange-rate-currencies',
				size           : 'sm',
				span           : 1,
			},
			{
				label : 'Rate',
				name  : 'price',
				type  : 'number',
				size  : 'sm',
				span  : 2,
			},
			{
				label : 'Quantity',
				name  : 'quantity',
				type  : 'number',
				size  : 'sm',
				span  : 2,
			},
			{
				label   : 'Unit',
				type    : 'select',
				name    : 'unit',
				options : convertObjectMappingToArray(AIR_UNITS),
				size    : 'sm',
				span    : 2,
			},
			{
				label  : 'Amount',
				type   : 'static',
				name   : 'total',
				size   : 'sm',
				span   : 2,
				render : (item) => <p>{(item?.total || DEFAULT_VALUE_FOR_NULL_HANDLING).toFixed(DECIMAL_PLACE)}</p>,
			},
		],

	};
};

export default getEditQuotationControls;
