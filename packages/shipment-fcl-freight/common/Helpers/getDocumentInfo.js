import ENTITY_FEATURE_MAPPING from '@cogoport/globalization/constants/entityFeatureMapping';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';

import { ONE, TWO } from '../../utils/constants';

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

const getStatus = ({ entityCode, invoiceStatus }) => {
	const { irn_label: irnLabel } = ENTITY_FEATURE_MAPPING[entityCode].labels;
	const INVOICE_STATUS_MAPPING = {
		DRAFT            : 'DRAFT',
		POSTED           : 'POSTED',
		FINANCE_ACCEPTED : 'FINANCE_ACCEPTED',
		CONSOLIDATED     : 'CONSOLIDATED',
		IRN_GENERATED    : `${irnLabel}_GENERATED`,
		IRN_FAILED       : `${irnLabel}_FAILED`,
		FAILED           : 'FAILED',
		IRN_CANCELLED    : `${irnLabel}_CANCELLED`,
		FINANCE_REJECTED : 'FINANCE_REJECTED',
	};
	return INVOICE_STATUS_MAPPING[invoiceStatus];
};

export default getStatus;
