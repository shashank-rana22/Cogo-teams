export const notBilledOptions = [
	{
		name  : 'R1',
		value : 'Service should have bill to customer',
		label : 'Service should have bill to customer',
	},
	{
		name  : 'R2',
		value : 'Incidental service; should add to sell quotation',
		label : 'Incidental service; should add to sell quotation',
	},
	{
		name  : 'R3',
		value : 'Detention charges; should add to sell quotation',
		label : 'Detention charges; should add to sell quotation',
	},
	{
		name  : 'R4',
		value : 'Rates should be disputed as inflated by supplier',
		label : 'Rates should be disputed as inflated by supplier',
	},
];

export const billedOptions = [
	{
		name  : 'rates',
		value : 'Rates inflated from supplier',
		label : 'Rates inflated from supplier',
	},
	{
		name  : 'sell',
		value : 'Sell-side charged less then buy quotation',
		label : 'Sell-side charged less then buy quotation',
	},
	{
		name  : 'system',
		value : 'System error from RMS Sell quotation generated wrong',
		label : 'System error from RMS Sell quotation generated wrong',
	},
	{
		name  : 'locals',
		value : 'Cogo assured bookings RMS sell quotation not generated for locals',
		label : 'Cogo assured bookings RMS sell quotation not generated for locals',
	},
];

export const draftOptions = [
	{
		name  : 'raised',
		value : 'Invoice raised more than or equals to buy',
		label : 'Invoice raised more than or equals to buy',
	},
	{
		name  : 'partial',
		value : 'Invoice raised of partial amount of buy',
		label : 'Invoice raised of partial amount of buy',
	},
	{
		name  : 'incidental',
		value : 'Incidental charges should be mark for review/finance accepted',
		label : 'Incidental charges should be mark for review/finance accepted',
	},
];

export const mismatchedOptions = [
	{
		name  : 'airway',
		value : 'Airway bill number',
		label : 'Airway bill number',
	},
	{
		name  : 'bill',
		value : 'Bill of lading number',
		label : 'Bill of lading number',
	},
	{
		name  : 'lorry',
		value : 'Lorry Receipt',
		label : 'Lorry Receipt',
	},
	{
		name  : 'container',
		value : 'Container number',
		label : 'Container number',
	},
];

export const miscellaneousOptions = [
	{
		name  : 'duplicate',
		value : 'Duplicate Invoice',
		label : 'Duplicate Invoice',
	},
	{
		name  : 'exeptions',
		value : 'Invoice not billed to cogoport',
		label : 'Invoice not billed to cogoport',
	},
	{
		name  : 'uploaded',
		value : 'Invocie uploaded in wrong SID',
		label : 'Invocie uploaded in wrong SID',
	},
	{
		name  : 'revised',
		value : 'Revised invoice received and this old one should be rejected',
		label : 'Revised invoice received and this old one should be rejected',
	},
	{
		name  : 'pod',
		value : 'POD not signed/stamped ',
		label : 'POD not signed/stamped ',
	},
];
