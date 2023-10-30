import { Toast } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';

const copyToClipboard = async (text, item) => {
	const modifiedText = text?.replace(GLOBAL_CONSTANTS.regex_patterns.hyphen_characters, '');

	try {
		await navigator.clipboard.writeText(modifiedText);
		Toast.success(`${item} copied to clipboard`);
	} catch (err) {
		Toast.error(`Failed to copy ${item}`);
	}
};

export default copyToClipboard;
