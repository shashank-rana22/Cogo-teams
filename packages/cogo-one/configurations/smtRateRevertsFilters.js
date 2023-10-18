import { SOURCE_OPTIONS } from '../constants/rateRevertsConstants';
import SHIPMENT_TYPE_OPTIONS from '../constants/shipmentTypes';

const smtRateRevertsFilters = ({ triggeredFrom = '' }) => [
	...(
		triggeredFrom === 'sideBar'
			? [
				{
					label       : 'Source',
					name        : 'source',
					controlType : 'multi-select',
					placeholder : 'Select Source',
					options     : Object.values(SOURCE_OPTIONS),
					size        : 'sm',
					prefix      : null,
				},
			] : []
	),
	{
		label       : 'Select Services',
		name        : 'service',
		controlType : 'select',
		size        : 'sm',
		placeholder : 'select',
		options     : Object.values(SHIPMENT_TYPE_OPTIONS).filter((itm) => !itm?.hideFor?.includes('smtRateReverts')),
	},
];

export default smtRateRevertsFilters;
