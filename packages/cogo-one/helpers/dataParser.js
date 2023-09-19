const dataParser = ({ res }) => {
	const parsedData = JSON.parse(res?.data?.message || '{}') || {};

	const draftContent = parsedData?.body?.content || '';

	const modifiedDraft = `<br/><br/><br/><br/>${draftContent}`;
	return modifiedDraft;
};

export { dataParser };
