import { isEmpty, getByKey } from '@cogoport/utils';

import { Object } from '../commons/Interfaces';

export const getDocumentNumber = ({ itemData }: Object) => {
	if (!isEmpty(getByKey(itemData, 'invoiceNumber'))) {
		return getByKey(itemData, 'invoiceNumber') as string;
	}
	return getByKey(itemData, 'proformaNumber') as string;
};

export const getDocumentUrl = ({ itemData }: Object) => {
	if (!isEmpty(getByKey(itemData, 'invoiceNumber'))) {
		return getByKey(itemData, 'invoicePdf');
	}
	return getByKey(itemData, 'proformaPdfUrl');
};
