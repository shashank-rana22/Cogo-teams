import { FREIGHT_CONTAINER_COMMODITY_MAPPINGS } from '@cogoport/globalization/constants/commodities';
import { startCase } from '@cogoport/utils';

import { snakeCaseToTitleCase } from './snakeCaseToTitleCase';

const mutateFields = ({ controls, containerType, setGlobalFilters, modeOptions }) => {
	const newFields = controls.map((ctr) => {
		const newCtr = { ...ctr };
		if (ctr.name === 'commodity') {
			newCtr.options = FREIGHT_CONTAINER_COMMODITY_MAPPINGS[containerType || 'standard']
				.map((value) => ({ label: startCase(value), value }));
			newCtr.disabled = !containerType;
		} else if (ctr.name === 'mode') {
			newCtr.onChange = (val) => setGlobalFilters((prev) => ({ ...prev, rate_type: val }));
			newCtr.options = modeOptions.map((key) => ({
				label : snakeCaseToTitleCase(key),
				value : key,
			}));
		}
		return newCtr;
	});

	return { newFields };
};

export default mutateFields;
