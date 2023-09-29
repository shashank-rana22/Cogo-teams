import { Legend } from '@cogoport/components';
import { startCase } from '@cogoport/utils';

const STATUS_MAPPING = {
	true  : 'green',
	false : 'grey',
};

const UNIT_MAPPING = {
	percentage: '%',
};

const itemFunctions = {
	renderName: (item, config) => (
		<span>{startCase(item?.[config?.key])}</span>
	),
	renderNumber: (item, config) => (
		<span>{item?.[config?.key] || '--'}</span>
	),
	renderStatus: (item, config) => {
		const value = item?.[config?.key];
		return (
			<Legend
				hasBackground={false}
				direction="horizontal"
				items={[{
					label : value ? 'Active' : 'Inactive',
					color : STATUS_MAPPING[value],
					key   : value,
				}]}
			/>
		);
	},
	renderValue: (item, config) => {
		const value = item?.[config?.key];
		const suffix = UNIT_MAPPING[item?.unit] || '';
		return (
			<span>{`${value} ${suffix}`}</span>
		);
	},
};

export default itemFunctions;
