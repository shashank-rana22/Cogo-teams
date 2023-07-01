import { URL_MATCH_REGEX, ENDS_WITH_STAR_SPACE, ENDS_WITH_STAR_CHAR } from '../constants';

const whatsappTextFormatting = () => {
	const URLRegex = new RegExp(URL_MATCH_REGEX);
	const endWithStarSpace = new RegExp(ENDS_WITH_STAR_SPACE);
	const endWithStarChar = new RegExp(ENDS_WITH_STAR_CHAR);

	const renderURLText = (txt = '') => (
		(txt?.split(' ') || [])
			.map((part) => (URLRegex.test(part) ? (
				`<a href=${part} target="_blank">${part} </a>`
			) : `${part} `))
	).join(' ');

	const replaceStarSpace = (txt = '') => (
		txt.split(endWithStarSpace).map((str, i) => {
			if (i === 0) {
				return ` <strong>${str.substring(0, txt.length - 1)}</strong> `;
			}
			return str;
		}).join('')
	);

	const replaceStarChar = (txt = '') => {
		if (txt.match(/\*/g).length === 1) {
			return txt.split('*').map((str, i) => {
				if (i === 0) {
					return ` <strong>${str.substring(0, txt.length - 1)}</strong>`;
				}
				return str;
			}).join('');
		}
		return txt;
	};

	const addStrongTag = (txt = '') => {
		const boldText = ` ${txt} `.split(' *').map((part, index) => {
			if (index === 0) return part;
			if (endWithStarSpace.test(part)) {
				return replaceStarSpace(part);
			}
			if (endWithStarChar.test(part)) {
				return replaceStarChar(part);
			}
			return ` *${part}`;
		}).join('');
		return boldText.substring(1, boldText.length - 1);
	};

	const renderBoldText = (txt = '') => (
		(txt?.split('<br>') || [])
			.map((part) => (
				addStrongTag(part)
			))
	).join('<br>');

	return {
		renderURLText,
		renderBoldText,
	};
};

export default whatsappTextFormatting;
