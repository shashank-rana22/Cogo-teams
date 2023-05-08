import { Toast } from '@cogoport/components';

const downloadFile = (file_url = '') => {
	const filename = file_url.substring(file_url.lastIndexOf('/') + 1);

	fetch(file_url)
		.then((response) => response.blob())
		.then((blob) => {
			const url = URL.createObjectURL(blob);
			const link = document.createElement('a');
			link.href = url;
			link.setAttribute('download', filename);
			document.body.appendChild(link);
			link.click();
		})
		.catch((error) => Toast.error(error?.message));
};

export default downloadFile;
