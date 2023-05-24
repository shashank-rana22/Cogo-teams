import { startCase, format } from '@cogoport/utils';

const itemFunctions = {
	renderName: (item, config) => (
		<span>{startCase(item?.[config?.key])}</span>
	),
	renderNumber: (item, config) => (
		<span>{item?.[config?.key] || '--'}</span>
	),
	renderDate: (item, config) => (
		<span>{format(item?.[config.key], 'dd-MM-yyy')}</span>
	),
};

export default itemFunctions;
