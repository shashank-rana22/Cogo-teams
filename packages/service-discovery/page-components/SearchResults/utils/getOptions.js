import containerSizes from '@cogoport/constants/container-sizes.json';
import containerTypes from '@cogoport/constants/container-types.json';
import truckTypes from '@cogoport/constants/truck-types.json';
import { startCase } from '@cogoport/utils';

const getOptions = (
	key,
	{ country_code = 'IN' },
) => {
	let options = [];
	if (key === 'container-sizes') {
		options = containerSizes;
	} else if (key === 'container-types') {
		options = containerTypes;
	} else if (key === 'truck-types') {
		const applicableTrucks = truckTypes.filter(
			(truck) => truck.country_codes.includes(country_code)
				|| truck.country_codes.includes('ALL'),
		);
		options = applicableTrucks.map((truck) => ({
			...truck,
			label: `${startCase(truck.type)} Body ${truck.label}`,
		}));
	}

	return options;
};
export default getOptions;
