import { Toast } from '@cogoport/components';

const copyToClipboard = async (text, message) => {
	const modifiedText = text.replace(/-/g, '');

	try {
		await navigator.clipboard.writeText(modifiedText);
		Toast.success(`${message} copied to clipboard`);
	} catch (err) {
		Toast.err('Failed to copy MAWB Number');
	}
};
export default copyToClipboard;
