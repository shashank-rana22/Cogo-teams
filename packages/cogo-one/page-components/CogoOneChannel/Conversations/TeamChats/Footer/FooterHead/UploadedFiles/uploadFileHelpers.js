export function deleteFile({
	uploadedFiles = '',
	fileLink = '',
	uploaderRef = {},
}) {
	if (typeof uploadedFiles === 'string') {
		uploaderRef.current?.externalHandleDelete(null);
		return null;
	}

	const filteredFiles = uploadedFiles.filter((eachFile) => eachFile !== fileLink);

	uploaderRef.current?.externalHandleDelete(filteredFiles);

	return filteredFiles;
}
