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
			<div>
				{getByKey(row, 'date1')}
				{' '}
				-
				{' '}
				{getByKey(row, 'date2')}
			</div>
		),

	},
	{
		Header   : <div>Bill Turn Around Time</div>,
		id       : 'hours',
		accessor : (row) => (
			<div className={styles.count}>
				{getByKey(row, 'hours').toFixed(2) as string}
				{' '}
				{' '}
				hours
			</div>

		),
	},

];
export default tatColumn;
