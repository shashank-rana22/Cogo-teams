import { SOURCE_OPTIONS, ADMIN_VIEW_REQUIRED_FOR } from '../constants/rateRevertsConstants';
import SHIPMENT_TYPE_OPTIONS from '../constants/shipmentTypes';

const smtRateRevertsFilters = ({
	triggeredFrom = '',
	viewType = '',
	serviceType = '',
	setFiltersData = () => {},
}) => [
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
		options     : Object.values(SHIPMENT_TYPE_OPTIONS).filter(
			(itm) => !itm?.hideFor?.includes('smtRateReverts'),
		),
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
	...(
		triggeredFrom !== 'sideBar'
			? [
				{
					label       : 'Service Provider',
					name        : 'service_provider_id',
					controlType : 'asyncSelect',
					placeholder : 'Select service provider',
					size        : 'sm',
					asyncKey    : 'organizations',
					initialCall : true,
					isClearable : true,
					onChange    : (_, obj) => setFiltersData(
						(prev) => ({
							...prev,
							service_provider_id: obj,
						}),
					),
					params: {
						filters: {
							account_type : 'service_provider',
							status       : 'active',
							kyc_status   : 'verified',
							service_type : serviceType || undefined,
						},
					},
				},
			] : []
	),
];

export default smtRateRevertsFilters;
