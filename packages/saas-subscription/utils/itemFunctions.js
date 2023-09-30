import { Legend } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
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
	renderEventName: (item) => {
		const { event = {} } = item || {};
		return (
			<span>{event?.display_name}</span>
		);
	},
	renderPlanName: (item) => {
		const { pricing = {} } = item || {};

		return (
			<span>{pricing?.name}</span>
		);
	},
	renderDate: (item, config) => (
		<span>
			{formatDate({
				date       : item?.[config.key],
				dateFormat : GLOBAL_CONSTANTS.formats.date['dd/MM/yyyy'],
				formatType : 'date',
			})}

		</span>
	),
};

export default itemFunctions;
