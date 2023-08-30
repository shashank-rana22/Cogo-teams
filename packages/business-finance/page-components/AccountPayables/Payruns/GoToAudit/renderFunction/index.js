import AcceptAudit from './AcceptAudit';
import BankPair from './BankPair';
import InvoiceData from './InvoiceData';
import styles from './styles.module.css';

const renderFunction = (
	{
		remarks = [],
		setRemarks = () => {},
		updateInvoice = () => {},
		updateLoading = false,
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
				updateLoading={updateLoading}
			/>
		),
		renderAuditRemarks: (item) => (
			<div className={styles.remarks_container}>{item?.remarks}</div>
		),
		renderInvoiceData: (item) => (
			<InvoiceData item={item} />
		),
	};
	return {
		functions,
	};
};

export default renderFunction;
