import { isEmpty, getByKey } from '@cogoport/utils';

export const getDocumentNumber = ({ itemData }) => {
	if (!isEmpty(getByKey(itemData, 'invoiceNumber'))) {
		return getByKey(itemData, 'invoiceNumber') as string;
	}
	return getByKey(itemData, 'proformaNumber') as string;
};
