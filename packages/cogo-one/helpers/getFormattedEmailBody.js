import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { isEmpty } from '@cogoport/utils';

function getFormattedEmailBody({ emailState }) {
	const emailBody = emailState?.rteContent || '';

	const testEmailBody = emailBody?.replaceAll('&nbsp;', '');
	const strippedContent = testEmailBody
		?.replaceAll(GLOBAL_CONSTANTS?.regex_patterns?.html_tags, '')
		?.trim();

	return !isEmpty(strippedContent);
}

export default getFormattedEmailBody;
