const downloadFileFromUrl = ({ sheetData }) => {
	const url = sheetData?.file_url;

	fetch(url)
		.then((response) => response.blob())
		.then((blob) => {
			const blobURL = URL.createObjectURL(new Blob([blob]));
			const fileName = url.split('/').pop();
			const aTag = document.createElement('a');
			aTag.href = blobURL;
			aTag.setAttribute('download', fileName);
			document.body.appendChild(aTag);
			aTag.click();
			aTag.remove();
		});
};

export default downloadFileFromUrl;
