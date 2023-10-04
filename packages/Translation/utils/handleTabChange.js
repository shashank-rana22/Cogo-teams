export const handleTabChange = (
	v: string,
	setReceivables: React.Dispatch<React.SetStateAction<string>>,
	push: (a: string, b: string) => void,
) => {
	push(
		'/translate/[activeTab]',
		`/translate/${v}`,
	);
	setReceivables(v);
};
