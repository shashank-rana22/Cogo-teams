const currentYear = new Date().getFullYear();
const newArray = [currentYear, currentYear - 1, currentYear - 2, currentYear - 3];

export const optionsYear = () => (newArray || [{}]).map((item) => (
	{ value: item.toString(), label: item.toString() }));

export const optionsMonth = [
	{ value: '1', label: 'January' },
	{ value: '2', label: 'February' },
	{ value: '3', label: 'March' },
	{ value: '4', label: 'April' },
	{ value: '5', label: 'May' },
	{ value: '6', label: 'June' },
	{ value: '7', label: 'July' },
	{ value: '8', label: 'August' },
	{ value: '9', label: 'September' },
	{ value: '10', label: 'October' },
	{ value: '11', label: 'November' },
	{ value: '12', label: 'December' },
];

export const optionsShipment = [
	{ value: 'SHIPMENT', label: 'Shipment' },
	{ value: 'MANUAL', label: 'Manual' },
];

export const optionsPills = [
	{ key: 'IMPORT', children: 'Import' },
	{ key: 'EXPORT', children: 'Export' },
	{ key: 'LOCAL', children: 'Local' },
	{ key: 'DOMESTIC', children: 'Domestic' },
];
export const optionSelect = [
	{ value: 'FCL_FREIGHT', label: 'FCL Freight' },
	{ value: 'LCL_FREIGHT', label: 'LCL Freight' },
	{ value: 'AIR_FREIGHT', label: 'AIR Freight' },
	{
		value : 'TRAILER_FREIGHT',
		label : 'Container Transportation',
	},
	{ value: 'FTL_FREIGHT', label: 'FTL Freight' },
	{ value: 'LTL_FREIGHT', label: 'LTL Freight' },
	{ value: 'HAULAGE_FREIGHT', label: 'Rail Haulage' },
	{ value: 'FCL_CUSTOMS', label: 'FCL Customs' },
	{ value: 'LCL_CUSTOMS', label: 'LCL Customs' },
	{ value: 'AIR_CUSTOMS', label: 'AIR Customs' },
];
export const optionsRadio = [
	{
		label : 'Amount',
		value : 'amount',
	},
	{
		label : 'Percentage',
		value : 'percentage',
	},
];

export const optionsData = [
	{
		label : '> Greater than',
		value : '>',
	},
	{
		label : '>= Greater than or equal to',
		value : '>=',
	},
	{
		label : '< less than ',
		value : '<',
	},
	{
		label : '<= less than or equal to',
		value : '<=',
	},
];

export const optionsJobData = [
	{
		label : 'Open',
		value : 'OPEN',
	},
	{
		label : ' Operations Closed',
		value : 'operations_closed',
	},
	{
		label : 'Finance Closed',
		value : 'finance_closed',
	},
];
