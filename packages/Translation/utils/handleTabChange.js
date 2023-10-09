export const handleTabChange = (
	v,
	setReceivables,
	push,
) => {
	push(
		'/translate/[activeTab]',
		`/translate/${v}`,
	);
	setReceivables(v);
};
