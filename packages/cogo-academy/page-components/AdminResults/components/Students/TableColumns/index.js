import { startCase, format } from '@cogoport/utils';

import SortComponent from '../../../commons/SortComponent';

import styles from './styles.module.css';

const getAppearedColumns = ({ sortFilter, setSortFilter }) => [
	{
		Header: (
			<div className={styles.container}>
				<div className={styles.item}>NAME</div>
			</div>
		),
		id       : 'user',
		accessor : ({ user = {} }) => <section>{user.name}</section>,
	},

	{
		Header   : <div>PASSED/FAILED</div>,
		id       : 'passed_failed',
		accessor : ({ result_status = '' }) => (
			<section>{startCase(result_status) || '-'}</section>
		),
	},
	{
		Header: (
			<div className={styles.container}>
				<div className={styles.item}>SCORE</div>

				<SortComponent
					value="final_score"
					sortFilter={sortFilter}
					setSortFilter={setSortFilter}
				/>
			</div>
		),
		id       : 'score_achieved',
		accessor : ({ final_score = '', test = {} }) => (
			<section>
				{Number(final_score).toFixed(2) || '0'}
				/
				{Number(test.total_marks).toFixed(2) || '0'}
			</section>
		),
	},
	{
		Header: (
			<div className={styles.container}>
				<div className={styles.item}>PERCENTILE</div>

				<SortComponent
					value="percentile"
					sortFilter={sortFilter}
					setSortFilter={setSortFilter}
				/>
			</div>
		),
		id       : 'percentile',
		accessor : ({ percentile = '' }) => (
			<div>{percentile !== null ? Number(percentile).toFixed(2) : '-'}</div>
		),
	},
	{
		Header: (
			<div className={styles.container}>
				<div className={styles.item}>TIME TAKEN</div>

				<SortComponent
					value="time_taken"
					sortFilter={sortFilter}
					setSortFilter={setSortFilter}
				/>
			</div>
		),
		id       : 'time_taken',
		accessor : ({ time_taken = '' }) => (

			time_taken > 0 ? (
				<div>
					{Math.ceil(time_taken)}
					{' '}
					{
						Math.ceil(time_taken) > 1 ? 'mins' : 'min'
					}
				</div>
			) : ('-')

		),
	},
	{
		Header: (
			<div className={styles.container}>
				<div className={styles.item}>ATTEMPTED ON</div>

				<SortComponent
					value="created_at"
					sortFilter={sortFilter}
					setSortFilter={setSortFilter}
				/>
			</div>
		),
		id       : 'attempted_on',
		accessor : ({ created_at = '' }) => (
			<section>{format(created_at, 'dd MMM yyyy hh:mm a')}</section>
		),
	},
];

const getNotAppeardColumns = () => [
	{
		Header   : 'NAME',
		id       : 'name',
		accessor : ({ name = '' }) => (
			<section>{startCase(name)}</section>
		),
	},
	{
		Header   : 'EMAIL',
		id       : 'email',
		accessor : ({ email = '' }) => (
			<section>{email}</section>
		),
	},
];

const getTableColumns = ({ sortFilter, setSortFilter, activeTab }) => {
	if (activeTab === 'appeared') {
		return getAppearedColumns({ sortFilter, setSortFilter });
	}

	return getNotAppeardColumns();
};

export default getTableColumns;
