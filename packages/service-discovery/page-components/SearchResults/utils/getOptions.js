import containerSizes from '@cogoport/constants/container-sizes.json';
import containerTypes from '@cogoport/constants/container-types.json';

const getOptions = (key) => {
	let options = [];
	if (key === 'container-sizes') {
		options = containerSizes;
	} else if (key === 'container-types') {
		options = containerTypes;
	}

	return options;
};
export default getOptions;
