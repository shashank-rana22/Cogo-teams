import { Toast } from '@cogoport/components';

const copyToClipboard = async (id) => {
	const path = `${window.location.host + window.location.pathname}/tests/${id}`;

	try {
		await navigator.clipboard.writeText(path);
		Toast.success('Copied successfully!');
	} catch (error) {
		Toast.error(error?.message || 'Cannot copy!');
	}
};

export default copyToClipboard;
