import List from '../../../../commons/List/index';
import showOverflowingNumber from '../../../../commons/showOverflowingNumber';
import { STATE_INVOICE_CONFIG } from '../../InvoiceTable/tableconfigurations/stateInvoiceconfig';

const MAX_LENGTH = 10;
function InvoiceList({ data = [] }) {
	const functions = {
		renderStateName: (itemData) => (
			<div>
				{showOverflowingNumber(itemData?.name || '-', MAX_LENGTH)}
			</div>
		),
	};
	return (<List config={STATE_INVOICE_CONFIG} itemData={{ list: data }} functions={functions} />);
}

export default InvoiceList;
