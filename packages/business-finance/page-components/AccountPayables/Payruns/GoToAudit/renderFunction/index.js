import InvoiceDetailsTimeLine from '../../../Invoices/InvoiceTable/RenderFunctions/InvoiceDetailsTimeLine';

import AcceptAudit from './AcceptAudit';
import BankPair from './BankPair';
import styles from './styles.module.css';

const renderFunction = (
	{
		remarks,
		setRemarks,
		updateInvoice,
	},
) => {
	const functions = {
		renderBankPair: (item) => (
			<BankPair item={item} />
		),
		renderAcceptAudit: (item) => (
			<AcceptAudit
				item={item}
				remarks={remarks}
				setRemarks={setRemarks}
				updateInvoice={updateInvoice}
			/>
		),
		renderAuditRemarks: (item) => (
			<div className={styles.remarks_container}>{item?.remarks}</div>
		),
		renderInvoiceDetails: (item) => (
			<InvoiceDetailsTimeLine item={item} />
		),
	};
	return {
		functions,
	};
};

export default renderFunction;
