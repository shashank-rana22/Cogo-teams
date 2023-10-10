import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { isEmpty, getByKey } from '@cogoport/utils';

import { Object } from '../commons/Interfaces';

const FIRST = 1;
const SECOND = 2;

export const getDocumentNumber = ({ itemData }: Object) => {
	const isPresent = ['irnNumber', 'invoiceNumber'].some((item) => !isEmpty(getByKey(itemData, item)));

	let key = 'proformaNumber';

	if (isPresent) {
		key = itemData?.eInvoicePdfUrl ? 'irnNumber' : 'invoiceNumber';
	}
	return getByKey(itemData, key) as string;
};

export const getDocumentUrl = ({ itemData }: Object) => {
	const isPresent = ['eInvoicePdfUrl', 'invoicePdf'].some((item) => !isEmpty(getByKey(itemData, item)));

	let key = 'proformaPdfUrl';

	if (isPresent) {
		key = itemData?.eInvoicePdfUrl ? 'eInvoicePdfUrl' : 'invoicePdf';
	}
	return getByKey(itemData, key);
};

export const getDocumentInfo = ({ itemData }: Object) => {
	const {
		irnNumber = '', invoiceNumber = '', proformaNumber = '',
		invoiceAdditionals: { cancelledEInvoicePdfUrl = '', cancelledIrnNumber = '' },
		proformaPdfUrl = '', invoicePdf = '', eInvoicePdfUrl = '',
		einvoicePdfUrl = '',
	} = itemData;

	const invoiceNumberPriority = [
		[cancelledIrnNumber, cancelledEInvoicePdfUrl, 'CANCELLED'],
		[irnNumber, eInvoicePdfUrl || einvoicePdfUrl, 'E INVOICE'],
		[invoiceNumber, invoicePdf, itemData?.invoiceType],
		[proformaNumber, proformaPdfUrl, itemData?.invoiceType],
	].filter((item) => (item[1] || undefined) !== undefined)[GLOBAL_CONSTANTS.zeroth_index];

	return {
		invoice_number : invoiceNumberPriority?.[GLOBAL_CONSTANTS.zeroth_index] || invoiceNumber,
		invoice_pdf    : invoiceNumberPriority?.[FIRST],
		invoice_type   : invoiceNumberPriority?.[SECOND],
	};
};
