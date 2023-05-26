import { startCase } from '@cogoport/utils';

const itemFunctions = {
	renderName: (item, config) => (
		<span>{startCase(item?.[config?.key])}</span>
	),
	renderNumber: (item, config) => (
		<span>{item?.[config?.key] || '--'}</span>
	),
};

export default itemFunctions;
