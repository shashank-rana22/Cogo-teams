import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';

function getFormattedEmailBody({ emailState }) {
	const emailBody = emailState?.rteContent || '';

	const testEmailBody = emailBody.replaceAll('&nbsp;', '');
	const strippedContent = testEmailBody
		.replaceAll(GLOBAL_CONSTANTS?.regex_patterns?.html_tags, '')
		.trim();

	if ((strippedContent).length) {
		return false;
	}
	return true;
}

export default getFormattedEmailBody;
