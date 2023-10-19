import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';

import RTE_QUILL_STYLES from '../constants/rteQuillStyles.json';

function objectToInlineStyles(obj = {}) {
	return Object.entries(obj || {})
		.map(([property, value]) => `${property}:${value}`)
		.join(';');
}

function getRenderEmailBody({ html = '' }) {
	let updatedHtml = html?.replace(
		GLOBAL_CONSTANTS.regex_patterns.html_class_regex,
		(match, classNames) => {
			const classNamesArray = classNames?.split(' ') || [];

			const inlineStyles = classNamesArray
				?.map(
					(className) => (RTE_QUILL_STYLES[className]
						? objectToInlineStyles(RTE_QUILL_STYLES[className]) : ''),
				)
				.filter((style) => style)
				.join(';');

			return `style="${inlineStyles}"`;
		},
	);
	updatedHtml = html?.replace(
		GLOBAL_CONSTANTS.regex_patterns.html_td_regex,
		() => "<td style='outline: 1px double #000'",
	);

	updatedHtml = updatedHtml?.replaceAll('<p>', "<p style='margin: 0'>");

	return updatedHtml;
}

export default getRenderEmailBody;
