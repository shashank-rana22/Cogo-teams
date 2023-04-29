export const handleTabChange = (
	v: string,
	setReceivables: React.Dispatch<React.SetStateAction<string>>,
	push: (a: string, b: string) => void,
) => {
	push(
		'/business-finance/translate-account-receivables/[activeTab]',
		`/business-finance/translate-account-receivables/${v}`,
	);
	setReceivables(v);
};
