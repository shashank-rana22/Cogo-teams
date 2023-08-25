import InvoiceDetailsTimeLine from '../../../Invoices/InvoiceTable/RenderFunctions/InvoiceDetailsTimeLine';

import AcceptAudit from './AcceptAudit';
import AuditRemarks from './AuditRemarks';
import BankPair from './BankPair';

const renderFunction = (
	{
		remarks,
		onClick,
		updateLoading,
		setRemarks,
	},
) => {
	const functions = {
		renderBankPair: (item) => (
			<BankPair item={item} />
		),
		renderAcceptAudit: (item) => (
			<AcceptAudit item={item} remarks={remarks} onClick={onClick} updateLoading={updateLoading} />
		),
		renderAuditRemarks: (item) => (
			<AuditRemarks item={item} remarks={remarks} setRemarks={setRemarks} />
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
