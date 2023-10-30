import { upperCase } from '@cogoport/utils';

const makeShortName = (name) => {
	if (name === null || name === undefined) return '';
	const words = name?.split(' ');
	let shortName = '';
	words?.forEach((word) => {
		shortName += word.slice(0, 1);
	});
	return upperCase(shortName);
};

export default makeShortName;
