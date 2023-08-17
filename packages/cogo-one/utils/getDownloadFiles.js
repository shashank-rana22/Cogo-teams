const LAST_ELEMENT = 1;

const getFilenameFromUrl = ({ fileUrl }) => {
	const parts = fileUrl.split('/');
	return parts[parts.length - LAST_ELEMENT];
};

const getDownloadFiles = async ({ imgUrl = '' }) => {
	try {
		const response = await fetch(imgUrl);
		const blob = await response.blob();
		const filename = getFilenameFromUrl({ fileUrl: imgUrl });
		const blobUrl = URL.createObjectURL(blob);
		const downloadLink = document.createElement('a');
		downloadLink.href = blobUrl;
		downloadLink.download = filename;
		document.body.appendChild(downloadLink);
		downloadLink.click();
		document.body.removeChild(downloadLink);
		URL.revokeObjectURL(blobUrl);
	} catch (error) {
		console.error('error', error);
	}
};

export default getDownloadFiles;
