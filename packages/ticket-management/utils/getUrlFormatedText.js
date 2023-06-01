import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';

const UrlRegex = new RegExp(GLOBAL_CONSTANTS.regex.url_match_regex);

const getUrlFormatedText = (txt = '') => (txt.split(' ') || [])
	.map((part) => (UrlRegex.test(part)
		? `<a href=${part} target="_blank">${part} </a>`
		: `${part} `))
	.join(' ');

export default getUrlFormatedText;
