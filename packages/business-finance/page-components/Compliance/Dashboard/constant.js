import { IcMActivePlans, IcMFileUploader, IcMInvoiceTriggers } from '@cogoport/icons-react';

export const dataValue = (filedCount, remainCount, t) => [
	{
		id    : 'filedCount',
		label : t('compliance:filed_count'),
		value : filedCount,
		color : '#3FD9EA',
	},
	{
		id    : 'remainCount',
		label : t('compliance:remain_count'),
		value : remainCount,
		color : '#D9D9D9',
	},
];
export const COLORS = ['#3FD9EA', '#D9D9D9'];

export const getInvoiceData = (totalUploaded, erroredOutTotal, fullMatchTotal, t) => [
	{
		label : t('compliance:total_invoices_uploaded'),
		value : totalUploaded || '0',
		icon  : <IcMFileUploader height="25px" width="25px" />,
	},
	{
		label : t('compliance:total_error_out_of_uploaded'),
		value : erroredOutTotal || '0',
		icon  : <IcMInvoiceTriggers height="25px" width="25px" />,
	},
	{
		label : t('compliance:full_match'),
		value : fullMatchTotal || '0',
		icon  : <IcMActivePlans height="25px" width="25px" />,
	},
];
