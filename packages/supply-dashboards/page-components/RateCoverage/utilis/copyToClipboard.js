import { Toast } from '@cogoport/components';
import { startCase } from '@cogoport/utils';

const copyToClipboard = async (text, item) => {
	const modifiedText = startCase(text);

	try {
		await navigator.clipboard.writeText(modifiedText);
		Toast.success(`${item} copied to clipboard`);
	} catch (err) {
		Toast.error(`Failed to copy ${item}`);
	}
};

export default copyToClipboard;
