import getGeoConstants from '@cogoport/globalization/constants/geo';

const geo = getGeoConstants();

const SINGLE_INT_START = 0;
const SINGLE_INT_END = 9;
const TOTAL_MONTH_DAYS = 28;
const TOTAL_HOURS = 24;
const TOTAL_MINUTES = 60;

export const SERVICE_OPTIONS = geo?.options.services;

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

export const FREQUENCY_OPTIONS = [
	{
		label: 'ONE TIME', value: 'ONE_TIME',
	},
	{
		label: 'DAILY', value: 'DAILY',
	},
	{ label: 'MONTHLY', value: 'MONTHLY' },
	{ label: 'WEEKLY', value: 'WEEKLY' },
];

export const MONTH_DAYS = Array(TOTAL_MONTH_DAYS).fill(null).map((item, index) => (
	{ label: String(index + 1), value: String(index + 1) }
));

export const HOURS = Array(TOTAL_HOURS).fill(null).map((item, index) => {
	if (index >= SINGLE_INT_START && index <= SINGLE_INT_END) {
		return { label: `0${String(index)}`, value: `0${String(index)}` };
	}
	return (
		{ label: String(index), value: String(index) }
	);
});

export const MINUTES = Array(TOTAL_MINUTES).fill(null).map((item, index) => {
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
