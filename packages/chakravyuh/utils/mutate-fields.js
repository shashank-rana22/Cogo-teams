import { FREIGHT_CONTAINER_COMMODITY_MAPPINGS } from '@cogoport/globalization/constants/commodities';
import { startCase } from '@cogoport/utils';

const mutateFields = ({ fields, containerType, setGlobalFilters, globalFilters }) => {
	const { chart_type } = globalFilters;
	const newFields = fields.map((ctr) => {
		const newCtr = { ...ctr };
		if (ctr.name === 'commodity') {
			newCtr.options = FREIGHT_CONTAINER_COMMODITY_MAPPINGS[containerType || 'standard']
				.map((value) => ({ label: startCase(value), value }));
			newCtr.disabled = !containerType;
		}
		if (ctr.name === 'service_type') {
			newCtr.onChange = (val) => setGlobalFilters((prev) => ({ ...prev, [ctr.name]: val }));
		}
		if (ctr.name === 'parent_mode') {
			if (chart_type === 'trend') {
				newCtr.options = newCtr.options.filter(({ value }) => value !== 'predicted');
			}
		}
		if (ctr.name === 'source') {
			if (chart_type === 'trend') {
				newCtr.options = newCtr.options.filter(({ value }) => value !== 'predicted');
			}
		}
		return newCtr;
	});

	return { newFields };
};

export default mutateFields;
