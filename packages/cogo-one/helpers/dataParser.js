const dataParser = ({ res = {}, signature = '' }) => {
	const parsedData = JSON.parse(res?.data?.message || '{}') || {};

	const draftContent = parsedData?.body?.content || '';

	const modifiedDraft = `${signature}<br/><br/>${draftContent}`;
	return modifiedDraft;
};

export { dataParser };
