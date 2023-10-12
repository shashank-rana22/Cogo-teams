import { InputController } from '@cogoport/forms';
import { startCase } from '@cogoport/utils';

import styles from './styles.module.css';

function CustomInput(props) {
	return <InputController type="number" size="sm" className={styles.input} {...props} />;
}

const getColumns = ({
	control = {},
}) => [
	{
		id       : 'channel_name',
		Header   : 'Channels',
		accessor : (item) => (
			<div key={item?.id}>
				{startCase(item?.channel_type)}
			</div>
		),
	},
	{
		id     : 'messages_day',
		Header : (
			<div>
				<div>Messages Per Day</div>
				<span>(Per User)</span>
			</div>
		),
		accessor: (item) => (
			<CustomInput
				name={`${item?.id}:${item?.channel_type}:msg_per_day`}
				value={item?.msg_per_day}
				control={control}
				placeholder="Messages Per Day"
			/>
		),
	},
	{
		id     : 'messages_week',
		Header : (
			<div>
				<div>Messages Per Week</div>
				<span>(Per User)</span>
			</div>
		),
		accessor: (item) => (
			<CustomInput
				name={`${item?.id}:${item?.channel_type}:msg_per_week`}
				value={item?.msg_per_week}
				control={control}
				placeholder="Messages Per Week"
			/>
		),
	},
	{
		id     : 'messages_month',
		Header : (
			<div>
				<div>Messages Per Month</div>
				<span>(Per User)</span>
			</div>
		),
		accessor: (item) => (
			<CustomInput
				name={`${item?.id}:${item?.channel_type}:msg_per_month`}
				value={item?.msg_per_month}
				control={control}
				placeholder="Messages Per Month"
			/>
		),
	},
];
export default getColumns;
