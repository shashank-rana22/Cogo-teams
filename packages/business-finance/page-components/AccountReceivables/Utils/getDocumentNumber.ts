import { isEmpty, getByKey } from '@cogoport/utils';

import { Object } from '../commons/Interfaces';

export const getDocumentNumber = ({ itemData }: Object) => {
	const key = itemData?.eInvoicePdfUrl ? 'irnNumber' : 'invoiceNumber';

	if (!isEmpty(getByKey(itemData, key))) {
		return getByKey(itemData, key) as string;
	}
	return getByKey(itemData, 'proformaNumber') as string;
};

export const getDocumentUrl = ({ itemData }: Object) => {
	const key = itemData?.eInvoicePdfUrl ? 'eInvoicePdfUrl' : 'invoicePdf';

	if (!isEmpty(getByKey(itemData, 'invoiceNumber')) || !isEmpty(getByKey(itemData, 'irnNumber'))) {
		return getByKey(itemData, key);
	}
	return getByKey(itemData, 'proformaPdfUrl');
};
