import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';

function getFormatedEmailBody({ emailState }) {
	const emailBody = emailState?.body || '';

	const checkRegex = GLOBAL_CONSTANTS?.regex_patterns?.para_html_tag_text || '';
	const checkH1Regex = GLOBAL_CONSTANTS?.regex_patterns?.h1_html_tag_text || '';
	const checkH2Regex = GLOBAL_CONSTANTS?.regex_patterns?.h2_html_tag_text || '';
	const checkH3Regex = GLOBAL_CONSTANTS?.regex_patterns?.h3_html_tag_text || '';
	const checkListRegex = GLOBAL_CONSTANTS?.regex_patterns?.li_html_tag_text || '';

	const testEmailBody = emailBody.replaceAll('&nbsp;', '');
	const matchedGroups = (testEmailBody)?.match(checkRegex) || [];
	const matchedH1Groups = (testEmailBody)?.match(checkH1Regex) || [];
	const matchedH2Groups = (testEmailBody)?.match(checkH2Regex) || [];
	const matchedH3Groups = (testEmailBody)?.match(checkH3Regex) || [];
	const matchedListGroups = (testEmailBody)?.match(checkListRegex) || [];

	const isEmpty = (matchedGroups).every((item) => item === '<p><br></p>');
	const isH1Empty = (matchedH1Groups).every((item) => item === '<h1><br></h1>');
	const isH2Empty = (matchedH2Groups).every((item) => item === '<h2><br></h2>');
	const isH3Empty = (matchedH3Groups).every((item) => item === '<h3><br></h3>');
	const isListEmpty = (matchedListGroups).every((item) => item === '<li><br></li>');

	return isEmpty && isListEmpty && isH1Empty && isH2Empty && isH3Empty;
}

export default getFormatedEmailBody;
