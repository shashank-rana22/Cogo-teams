import { isEmpty, getByKey } from '@cogoport/utils';

import { Object } from '../common/interfaces';

const checkInvoice = ({ itemData }: Object) => {
	if (getByKey(itemData, 'invoiceType') === 'CREDIT_NOTE') {
		return 'Credit Note';
	}
	if (!isEmpty(getByKey(itemData, 'invoiceNumber'))) {
		return 'Invoice';
	}
	return 'Proforma';
};

export default checkInvoice;
