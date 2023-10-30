export const handleTabChange = (
	v,
	setReceivables,
	push,
) => {
	push(
		'/business-finance/translate-account-receivables/[activeTab]',
		`/business-finance/translate-account-receivables/${v}`,
	);
	setReceivables(v);
};
