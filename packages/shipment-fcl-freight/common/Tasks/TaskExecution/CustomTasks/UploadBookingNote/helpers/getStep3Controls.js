import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import FCL_UNITS from '@cogoport/ocean-modules/constants/FCL_UNITS';
import { convertObjectMappingToArray } from '@cogoport/ocean-modules/utils/convertObjectMappingToArray';
import currencyCodeOptions from '@cogoport/ocean-modules/utils/currencyCode';
import { startCase } from '@cogoport/utils';

const getStep3Controls = ({ service_charge, shipment_data, handleChange }) => {
	const { service_type, service_detail, trade_type, service_id } = service_charge || {};
	return {
		type         : 'edit_service_charges',
		name         : service_id,
		service_name : service_type,
		shipment_id  : shipment_data?.id,
		showButtons  : service_type !== 'subsidiary_service',
		cargoDetails : service_detail?.[GLOBAL_CONSTANTS.zeroth_index],
		value        : [{
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
				label   : 'Currency',
				name    : 'currency',
				type    : 'select',
				options : currencyCodeOptions,
				size    : 'sm',
				span    : 2,
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
				options : convertObjectMappingToArray(FCL_UNITS),
				size    : 'sm',
				span    : 2,
			},
			{
				label  : 'Amount',
				type   : 'static',
				name   : 'total',
				size   : 'sm',
				span   : 1,
				render : (item) => <p>{item?.total}</p>,
			},
		],

	};
};

export default getStep3Controls;
