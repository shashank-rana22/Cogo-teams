export const notBilledOptions = [
	{
		name  : 'R1',
		value : 'Charges should be billed to customer',
		label : 'Charges should be billed to customer',
	},
	{
		name  : 'R2',
		value : 'Incidental charges; should be added to sell quotation',
		label : 'Incidental charges; should be added to sell quotation',
	},
	{
		name  : 'R3',
		value : 'Detention charges; should be added to sell quotation',
		label : 'Detention charges; should be added to sell quotation',
	},
	{
		name  : 'R4',
		value : 'Rates inflated by supplier and should be disputed',
		label : 'Rates inflated by supplier and should be disputed',
	},
];

export const billedOptions = [
	{
		name  : 'rates',
		value : 'Rates inflated by supplier',
		label : 'Rates inflated by supplier',
	},
	{
		name  : 'sell',
		value : 'Charges in Sales Invoice charged less than sell quotation.',
		label : 'Charges in Sales Invoice charged less than sell quotation.',
	},
	{
		name  : 'system',
		value : 'Incorrect RMS/Platform rates',
		label : 'Incorrect RMS/Platform rates',
	},
	{
		name  : 'locals',
		value : 'Cogo-assured bookings RMS sell quotation not generated for locals',
		label : 'Cogo-assured bookings RMS sell quotation not generated for locals',
	},
];

export const draftOptions = [
	{
		name  : 'raised',
		value : 'Invoice raised with rates more than or equals to buy',
		label : 'Invoice raised with rates more than or equals to buy',
	},
	{
		name  : 'partial',
		value : 'Invoice raised with rates partial amount of buy',
		label : 'Invoice raised with rates partial amount of buy',
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
		name  : 'reference',
		value : 'Booking Reference Number',
		label : 'Booking Reference Number',
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
		name  : 'tagged',
		value : 'Proforma Invoice should be tagged',
		label : 'Proforma Invoice should be tagged',
	},
	{
		name  : 'uploaded',
		value : 'Invoice uploaded in wrong SID',
		label : 'Invoice uploaded in wrong SID',
	},
	{
		name  : 'duplicateInvoiceNumber',
		value : 'Duplicate Invoice number; Should ask for revised invoice with new invoice number',
		label : 'Duplicate Invoice number; Should ask for revised invoice with new invoice number',
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
