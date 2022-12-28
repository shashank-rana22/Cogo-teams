import { format } from '@cogoport/utils';

const infoOptions = (data) => [
	{
		key   : 'Cargo Readiness Date',
		value : format(data.cargo_readiness_date, 'dd MMM yyyy'),
	},
	{
		key   : 'Expected Departure Date',
		value :	format(data.schedule_departure || data.selected_schedule_departure, 'dd MMM yyyy'),

	},
	{
		key   : 'Supply Agent',
		value : data.supply_agent?.name || '',
	},
	{
		key   : 'SO1',
		value : data.service_ops?.name || '',
	},

	{
		key   : 'KAM',
		value : data.booking_agent?.name || '',
	},
];
export default infoOptions;
