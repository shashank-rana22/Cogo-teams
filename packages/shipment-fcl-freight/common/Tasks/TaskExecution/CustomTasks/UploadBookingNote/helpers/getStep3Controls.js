import FCL_UNITS from '@cogoport/ocean-modules/contants/FCL_UNITS';
import { convertObjectMappingToArray } from '@cogoport/ocean-modules/utils/convertObjectMappingToArray';
import { startCase } from '@cogoport/utils';

const getStep3Controls = ({ service_charge, shipment_data }) => {
	const { id, service_type, service_detail, trade_type } = service_charge || {};
	return {
		type         : 'edit_service_charges',
		name         : id,
		service_name : service_type,
		shipment_id  : shipment_data?.id,
		showButtons  : service_type !== 'subsidiary_service',
		cargoDetails : service_detail?.[0],
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
				label : startCase(`${trade_type || ''} - ${service_type || ''}`),
				type  : 'select',
				name  : 'code',
				span  : 3,
				size  : 'sm',
			},
			{
				label          : 'Currency',
				name           : 'currency',
				type           : 'async-select',
				optionsListKey : 'currencies',
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
				options : convertObjectMappingToArray(FCL_UNITS),
				size    : 'sm',
				span    : 2,
			},
			{
				label  : 'Amount',
				type   : 'static',
				name   : 'total',
				size   : 'sm',
				span   : 2,
				render : (item) => <p>{item?.total}</p>,
			},
		],

	};
};

export default getStep3Controls;
