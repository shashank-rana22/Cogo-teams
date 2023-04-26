import { startCase } from '@cogoport/utils';

function getShortFileName({ url }) {
	const shortName = ((startCase(url).split(' ')).slice(-2)).join('.');

	return shortName;
}

export default getShortFileName;
