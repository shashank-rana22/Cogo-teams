import { startCase, format } from '@cogoport/utils';

import SortComponent from '../../../commons/SortComponent';

import styles from './styles.module.css';

const getAppearedColumns = ({ sortFilter, setSortFilter }) => [
	{
		Header: (
			<div className={styles.container}>
				<div>NAME</div>

				<SortComponent
					value="user"
					sortFilter={sortFilter}
					setSortFilter={setSortFilter}
				/>
			</div>
		),
		id       : 'user',
		accessor : ({ user = '' }) => <section>{user}</section>,
	},

	{
		Header   : <div>PASSED/FAILED</div>,
		id       : 'passed_failed',
		accessor : ({ result = '' }) => (
			<section>{startCase(result) || '-'}</section>
		),
	},
	{
		Header: (
			<div className={styles.container}>
				<div>SCORE</div>

				<SortComponent
					value="score_achieved"
					sortFilter={sortFilter}
					setSortFilter={setSortFilter}
				/>
			</div>
		),
		id       : 'score_achieved',
		accessor : ({ score_achieved = '', total_score = '' }) => (
			<section>
				{Number(score_achieved).toFixed(2) || '0'}
				/
				{Number(total_score).toFixed(2) || '0'}
			</section>
		),
	},
	{
		Header: (
			<div className={styles.container}>
				<div>PERCENTILE</div>

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
				<div>TIME TAKEN</div>

				<SortComponent
					value="time_taken"
					sortFilter={sortFilter}
					setSortFilter={setSortFilter}
				/>
			</div>
		),
		id       : 'time_taken',
		accessor : ({ time_taken = '' }) => (
			<div>
				{Math.ceil(time_taken)}
				{' '}
				{
					Math.ceil(time_taken) > 1 ? 'mins' : 'min'
				}
			</div>
		),
	},
	{
		Header: (
			<div className={styles.container}>
				<div>ATTEMPTED ON</div>

				<SortComponent
					value="attempted_on"
					sortFilter={sortFilter}
					setSortFilter={setSortFilter}
				/>
			</div>
		),
		id       : 'attempted_on',
		accessor : ({ attempted_on = '' }) => (
			<section>{format(attempted_on, 'dd MMM yyyy hh:mm a')}</section>
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
