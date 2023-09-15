import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';

const ONE = 1;
const TWO = 2;

export const getDocumentInfo = ({ bfInvoice }) => {
	const {
		einvoiceNumber = '', invoiceNumber = '', proformaNumber = '',
		invoiceAdditional = {},
		proformaPdfUrl = '', invoicePdfUrl = '', eInvoicePdfUrl = '',
		einvoicePdfUrl = '',
	} = bfInvoice || {};

	const eInvoice = eInvoicePdfUrl || einvoicePdfUrl;

	const { cancelledEInvoicePdfUrl = '', cancelledIrnNumber = '' } = invoiceAdditional || {};

	const invoiceNumberPriority = [
		[cancelledIrnNumber, cancelledEInvoicePdfUrl, 'CANCELLED E Invoice'],
		[einvoiceNumber, eInvoice, 'E INVOICE'],
		[invoiceNumber, invoicePdfUrl, bfInvoice?.invoiceType],
		[proformaNumber, proformaPdfUrl, bfInvoice?.invoiceType],
	].filter((item) => (
		item[ONE] || undefined
	) !== undefined)[GLOBAL_CONSTANTS.zeroth_index]
	|| [undefined, undefined, undefined];

	return {
		invoice_number : invoiceNumberPriority[GLOBAL_CONSTANTS.zeroth_index],
		invoice_pdf    : invoiceNumberPriority[ONE],
		invoice_type   : invoiceNumberPriority[TWO],
	};
};
