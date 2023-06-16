import List from '../../../../commons/List/index.tsx';
import { STATE_INVOICE_CONFIG } from '../../InvoiceTable/tableconfigurations/stateInvoiceconfig';

function InvoiceList({ data = [] }) {
	return (<List config={STATE_INVOICE_CONFIG} itemData={{ list: data }} />);
}

export default InvoiceList;
