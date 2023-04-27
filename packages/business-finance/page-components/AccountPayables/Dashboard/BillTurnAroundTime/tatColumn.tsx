import { startCase, getByKey } from '@cogoport/utils';

import styles from './styles.module.css';

const tatColumn = [
	{
		Header   : <div>Start Task</div>,
		id       : 'firstEvent',
		accessor : (row) => (

			<div className={styles.reference_id}>
				{startCase(getByKey(row, 'firstEvent') as string)}
			</div>

		),
	},
	{
		Header   : <div>End Task</div>,
		id       : 'secondEvent',
		accessor : (row) => (
			<div className={styles.reference_id}>
				{startCase(getByKey(row, 'secondEvent') as string)}
			</div>
		),
	},
	{
		Header   : <div>Date Range</div>,
		id       : 'date1',
		accessor : (row) => (
			<>
				{getByKey(row, 'date1')}
				{' '}
				-
				{' '}
				{getByKey(row, 'date2')}
			</>
		),

	},
	{
		Header   : <div>Bill Turn Around Time</div>,
		id       : 'hours',
		accessor : (row) => (
			<div className={styles.count}>
				{(getByKey(row, 'hours') as number)?.toFixed(2) }
				{' '}
				{' '}
				hours
			</div>

		),
	},

];
export default tatColumn;
