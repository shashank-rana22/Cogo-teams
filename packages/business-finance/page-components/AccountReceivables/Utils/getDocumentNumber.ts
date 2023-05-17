import { isEmpty, getByKey } from '@cogoport/utils';

import { Object } from '../commons/Interfaces';

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
