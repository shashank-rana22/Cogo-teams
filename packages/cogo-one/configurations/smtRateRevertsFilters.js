import { SOURCE_OPTIONS, ADMIN_VIEW_REQUIRED_FOR } from '../constants/rateRevertsConstants';
import SHIPMENT_TYPE_OPTIONS from '../constants/shipmentTypes';

const smtRateRevertsFilters = ({ triggeredFrom = '', viewType = '' }) => [
	...(ADMIN_VIEW_REQUIRED_FOR.includes(viewType)
		? [
			{
				label       : 'Relevant to',
				name        : 'relevant_to',
				controlType : 'radio',
				options     : [
					{
						label : 'All',
						value : 'all',
					},
					{
						label : 'Me',
						value : 'me',
					},
				],
			}] : []
	),
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
		name        : 'shipment_serial_id',
		controlType : 'input',
		size        : 'sm',
		placeholder : 'Search SID',
	},
];

export default smtRateRevertsFilters;
