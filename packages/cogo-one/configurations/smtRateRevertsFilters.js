import { SOURCE_OPTIONS } from '../constants/rateRevertsConstants';
import SHIPMENT_TYPE_OPTIONS from '../constants/shipmentTypes';

const smtRateRevertsFilters = ({ triggeredFrom = '', setShipmentObj = () => {} }) => [
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
	{
		label                 : 'Date Range',
		name                  : 'dateRange',
		controlType           : 'singleDateRange',
		size                  : 'sm',
		placeholder           : 'select',
		isPreviousDaysAllowed : true,
		maxDate               : new Date(),
		isClearable           : false,
	},
	{
		label       : 'SID',
		name        : 'shipment_id',
		controlType : 'asyncSelect',
		asyncKey    : 'list_shipments',
		size        : 'sm',
		placeholder : 'Search SID',
		initialCall : true,
		onChange    : (_, obj) => setShipmentObj(obj),
		isClearable : true,
	},
];

export default smtRateRevertsFilters;
