import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';

import RTE_QUILL_STYLES from '../constants/rteQuillStyles.json';
import uploadFile from '../hooks/useUploadFile';

function objectToInlineStyles(obj = {}) {
	return Object.entries(obj || {})
		.map(([property, value]) => `${property}:${value}`)
		.join(';');
}

const stringToBlob = (imageDataString) => {
	const imageData = imageDataString.split(',')[1];

	const byteCharacters = atob(imageData);
	const byteNumbers = Array.from(byteCharacters, (char) => char.charCodeAt(0));
	const byteArray = new Uint8Array(byteNumbers);
	const blob = new Blob([byteArray], { type: 'image/png' });
	const file = new File([blob], 'Screenshot.png', { type: 'image/png' });

	return file;
};

const replaceAsync = async (inputString, regex, asyncReplaceFn) => {
	let regMatches = [];
	let match = regex.exec(inputString);

	while (match) {
		regMatches = [...regMatches, {
			match : match[GLOBAL_CONSTANTS.zeroth_index],
			index : match.index,
		}];

		match = regex.exec(inputString);
	}

	let currentIndex = 0;
	const replacedParts = await Promise.all(regMatches.map(async (matchObj) => {
		const { match: matchRx, index } = matchObj;
		const nonMatchPart = inputString.substring(currentIndex, index);
		currentIndex = index + matchRx.length;

		const replaced = await asyncReplaceFn(matchRx);
		return `${nonMatchPart}${replaced}`;
	}));
	return replacedParts.join('') + inputString.substring(currentIndex);
};

async function getRenderEmailBody({ html = '', isUploadFile = false }) {
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
	updatedHtml = updatedHtml?.replace(
		GLOBAL_CONSTANTS.regex_patterns.html_td_regex,
		() => "<td style='outline: 1px double #000'",
	);

	if (isUploadFile) {
		updatedHtml = await replaceAsync(
			updatedHtml,
			GLOBAL_CONSTANTS.regex_patterns.html_img_regex,
			async (imageDataString) => {
				try {
					const file = stringToBlob(imageDataString);
					const imageUrl = await uploadFile(file);
					return imageUrl;
				} catch (e) {
					console.error(e.message);
				}
				return imageDataString;
			},
		);
		updatedHtml = updatedHtml?.replace(
			GLOBAL_CONSTANTS.regex_patterns.htm_img_filename_regex,
			() => '',
		);
	}

	updatedHtml = updatedHtml?.replaceAll('<p>', "<p style='margin: 0'>");

	return updatedHtml;
}

export default getRenderEmailBody;
