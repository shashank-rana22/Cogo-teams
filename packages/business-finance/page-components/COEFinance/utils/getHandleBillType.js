export const handleBillType = (billType, isProforma) => {
	let invoiceType = '';
	if (billType === 'BILL') {
		if (isProforma) {
			invoiceType = 'Proforma Invoice';
		} else {
			invoiceType = 'Purchase Invoice';
		}
	} else if (billType === 'REIMBURSEMENT') {
		if (isProforma) {
			invoiceType = 'Reimb. Proforma';
		} else {
			invoiceType = 'Reimb. Invoice';
		}
	} else if (billType === 'EXPENSE') {
		invoiceType = 'Expense';
	} else if (billType === 'CREDIT_NOTE') {
		invoiceType = 'Credit Notes';
	}
	return invoiceType;
};
