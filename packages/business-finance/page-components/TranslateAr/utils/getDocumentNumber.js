import { isEmpty, getByKey } from '@cogoport/utils';

export const getDocumentNumber = ({ itemData }) => {
	if (!isEmpty(getByKey(itemData, 'invoiceNumber'))) {
		return getByKey(itemData, 'invoiceNumber');
	}
	return getByKey(itemData, 'proformaNumber');
};

export const getDocumentUrl = ({ itemData }) => {
	if (!isEmpty(getByKey(itemData, 'invoiceNumber'))) {
		return getByKey(itemData, 'invoicePdfUrl');
	}
	return getByKey(itemData, 'proformaPdfUrl');
};
