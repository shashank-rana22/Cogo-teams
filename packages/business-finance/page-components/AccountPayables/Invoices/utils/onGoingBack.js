const onGoingBack = ({ viewSelectedInvoice = false, setViewSelectedInvoice = () => {}, push = () => {} }) => {
	if (!viewSelectedInvoice) {
		push(
			'/business-finance/account-payables/[active_tab]',
			'/business-finance/account-payables/invoices',
		);
	} else setViewSelectedInvoice(false);
};

export default onGoingBack;
