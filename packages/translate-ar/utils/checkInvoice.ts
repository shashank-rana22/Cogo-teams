import { isEmpty, getByKey } from '@cogoport/utils';

const checkInvoice = ({ itemData }) => {
	if (!isEmpty(getByKey(itemData, 'invoiceNumber'))) {
		return 'Invoice';
	}
	return 'Proforma';
};

export default checkInvoice;
