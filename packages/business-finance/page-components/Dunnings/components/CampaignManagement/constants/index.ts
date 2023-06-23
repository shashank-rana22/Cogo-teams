import getGeoConstants from '@cogoport/globalization/constants/geo';

const geo = getGeoConstants();

const SINGLE_INT_START = 0;
const SINGLE_INT_END = 9;

export const SERVICE_OPTIONS = geo?.options.services;

export const CYCLE_OPTIONS = [
	{ label: 'Scheduled', value: 'SCHEDULED' },
	{ label: 'Cancelled', value: 'CANCELLED' },
	{ label: 'Completed', value: 'COMPLETED' },
	{ label: 'In Progress', value: 'IN_PROGRESS' },
	{ label: 'Failed', value: 'FAILED' },
];

export const CYCLE_TYPE = [
	{
		label: 'SOA', value: 'SOA',
	},
	{
		label: 'WIS', value: 'WIS',
	},
	{
		label : 'Balance Confirmation',
		value : 'BALANCE_CONFIRMATION',
	},
];

export const MONTH_DAYS = Array(28).fill(null).map((item, index) => (
	{ label: String(index + 1), value: String(index + 1) }
));

export const HOURS = Array(24).fill(null).map((item, index) => {
	if (index >= SINGLE_INT_START && index <= SINGLE_INT_END) {
		return { label: `0${String(index)}`, value: `0${String(index)}` };
	}
	return (
		{ label: String(index), value: String(index) }
	);
});

export const MINUTES = Array(60).fill(null).map((item, index) => {
	if (index >= SINGLE_INT_START && index <= SINGLE_INT_END) {
		return { label: `0${String(index)}`, value: `0${String(index)}` };
	}
	return (
		{ label: String(index), value: String(index) }
	);
});

export const WEEK_OPTIONS = [
	{
		key      : 'MONDAY',
		children : 'Monday',
		suffix   : null,
		tooltip  : false,
	},
	{
		key      : 'TUESDAY',
		children : 'Tuesday',
		suffix   : null,
		tooltip  : false,
	},
	{
		key      : 'WEDNESDAY',
		children : 'Wednesday',
		suffix   : null,
		tooltip  : false,
	},
	{
		key      : 'THURSDAY',
		children : 'Thursday',
		suffix   : null,
		tooltip  : false,
	},
	{
		key      : 'FRIDAY',
		children : 'Friday',
		suffix   : null,
		tooltip  : false,
	},
	{
		key      : 'SATURDAY',
		children : 'Saturday',
		suffix   : null,
		tooltip  : false,
	},
	{
		key      : 'SUNDAY',
		children : 'Sunday',
		suffix   : null,
		tooltip  : false,
	},
];
