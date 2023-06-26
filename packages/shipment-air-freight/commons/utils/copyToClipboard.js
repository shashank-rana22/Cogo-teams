import { Toast } from '@cogoport/components';

const copyToClipboard = async (text, item) => {
	const modifiedText = text.replace(/-/g, '');
	try {
		await navigator.clipboard.writeText(modifiedText);
		Toast.success(`${item} copied to clipboard`);
	} catch (err) {
		Toast.error(`Failed to copy ${item}`);
	}
};

export default copyToClipboard;
