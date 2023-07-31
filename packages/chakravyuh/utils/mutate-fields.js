import { FREIGHT_CONTAINER_COMMODITY_MAPPINGS } from '@cogoport/globalization/constants/commodities';
import { startCase } from '@cogoport/utils';

const mutateFields = ({ controls, containerType, setGlobalFilters }) => {
	const newFields = controls.map((ctr) => {
		const newCtr = { ...ctr };
		if (ctr.name === 'commodity') {
			newCtr.options = FREIGHT_CONTAINER_COMMODITY_MAPPINGS[containerType || 'standard']
				.map((value) => ({ label: startCase(value), value }));
			newCtr.disabled = !containerType;
		}
		if (ctr.name === 'service_type') {
			newCtr.onChange = (val) => setGlobalFilters((prev) => ({ ...prev, [ctr.name]: val }));
		}
		return newCtr;
	});

	return { newFields };
};

export default mutateFields;
