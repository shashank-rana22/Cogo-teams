import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals.json';
import { startCase, format } from '@cogoport/utils';

import toFixed from '../../../../CreateModule/utils/toFixed';
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
		accessor : ({ user = {} }) => <section className={styles.section}>{user.name}</section>,
	},

	{
		Header   : <div className={styles.container}>PASSED/FAILED</div>,
		id       : 'passed_failed',
		accessor : ({ result_status = '' }) => (
			<section className={styles.section}>{startCase(result_status) || '-'}</section>
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
			<section className={styles.section}>
				{toFixed(final_score, 2)}
				/
				{toFixed(test.total_marks, 2)}

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
			<div className={styles.section}>{percentile !== null ? toFixed(percentile, 2) : '-'}</div>
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
		accessor : ({ time_taken = '' }) => {
			const timeTaken = Math.ceil(time_taken);
			return (
				(time_taken > 0) ? (
					<div className={styles.section}>
						{timeTaken}
						{' '}
						{timeTaken > 1 ? 'mins' : 'min'}
					</div>
				) : ('-')
			);
		},
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
			<section className={styles.section}>
				{format(
					created_at,
					`${GLOBAL_CONSTANTS.formats.date['dd MMM yyyy']} ${GLOBAL_CONSTANTS.formats.time['hh:mm aaa']}`,
				)}
			</section>
		),
	},
];

const getNotAppeardColumns = () => [
	{
		Header   : 'NAME',
		id       : 'name',
		accessor : ({ user = {} }) => (
			<section>{startCase(user.name)}</section>
		),
	},
	{
		Header   : 'EMAIL',
		id       : 'email',
		accessor : ({ user = {} }) => (
			<section>{user.email}</section>
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
