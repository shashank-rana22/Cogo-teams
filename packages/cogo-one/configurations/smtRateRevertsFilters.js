import SHIPMENT_TYPE_OPTIONS from '../constants/shipmentTypes';

const controls = [
	{
		label       : 'Select Services',
		name        : 'service',
		controlType : 'select',
		size        : 'sm',
		placeholder : 'select',
		options     : Object.values(SHIPMENT_TYPE_OPTIONS),
	},
];

export default controls;
