function formatDocuments({ documents = '' }) {
	const flattenDocuments = [documents].flat();

	return flattenDocuments?.reduce((acc, item) => {
		const fileUrl = typeof item === 'object' ? item?.finalUrl || item?.url : item;

		return fileUrl ? [...acc, fileUrl] : acc;
	}, []);
}

export {
	formatDocuments,
};
