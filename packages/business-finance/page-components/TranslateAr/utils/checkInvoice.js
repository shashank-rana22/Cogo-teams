import { isEmpty, getByKey } from '@cogoport/utils';

const checkInvoice = ({ itemData }) => {
	if (getByKey(itemData, 'invoiceType') === 'CREDIT_NOTE') {
		return 'Credit Note';
	}
	if (!isEmpty(getByKey(itemData, 'invoiceNumber'))) {
		return 'Invoice';
	}
	return 'Proforma';
};

export default checkInvoice;
