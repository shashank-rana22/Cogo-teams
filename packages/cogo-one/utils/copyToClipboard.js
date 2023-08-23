import { Toast } from '@cogoport/components';

const copyToClipboard = async ({ content = '', label = '' }) => {
	try {
		await navigator.clipboard.writeText(content);
		Toast.success(`${label} copied to clipboard`);
	} catch (err) {
		Toast.error(`Failed to copy ${label}`);
	}
};

export default copyToClipboard;
