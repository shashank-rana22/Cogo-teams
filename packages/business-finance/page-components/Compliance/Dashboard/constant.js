import { IcMActivePlans, IcMFileUploader, IcMInvoiceTriggers } from '@cogoport/icons-react';

export const dataValue = (filedCount, remainCount) => [
	{
		id    : 'filedCount',
		label : 'File Count',
		value : filedCount,
		color : '#3FD9EA',
	},
	{
		id    : 'remainCount',
		label : 'Remain Count',
		value : remainCount,
		color : '#D9D9D9',
	},
];
export const COLORS = ['#3FD9EA', '#D9D9D9'];

export const getInvoiceData = (totalUploaded, erroredOutTotal, fullMatchTotal) => [
	{
		label : 'Total Invoices Uploaded',
		value : totalUploaded || '0',
		icon  : <IcMFileUploader height="25px" width="25px" />,
	},
	{
		label : 'Total Errored Out Uploaded',
		value : erroredOutTotal || '0',
		icon  : <IcMInvoiceTriggers height="25px" width="25px" />,
	},
	{ label: 'Full Match', value: fullMatchTotal || '0', icon: <IcMActivePlans height="25px" width="25px" /> },
];
