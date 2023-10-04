import InputNumberController from '@cogoport/forms/page-components/Controlled/InputNumberController';
import { startCase } from '@cogoport/utils';

import styles from './styles.module.css';

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
			<InputNumberController
				name={`${item?.id}:${item?.channel_type}:msg_per_day`}
				value={item?.msg_per_day}
				className={styles.input}
				control={control}
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
			<InputNumberController
				name={`${item?.id}:${item?.channel_type}:msg_per_week`}
				value={item?.msg_per_week}
				className={styles.input}
				control={control}
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
			<InputNumberController
				name={`${item?.id}:${item?.channel_type}:msg_per_month`}
				value={item?.msg_per_month}
				className={styles.input}
				control={control}
			/>
		),
	},
];
export default getColumns;
