import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals.json';
import { IcMDelete } from '@cogoport/icons-react';
import { startCase, format } from '@cogoport/utils';

import toFixed from '../../../../CreateModule/utils/toFixed';
import SortComponent from '../../../commons/SortComponent';

import IsEvaluated from './IsEvaluated';
import styles from './styles.module.css';

const handleRedirectToDashboard = ({ router, user, test_id, is_evaluated, status }) => {
	const { id, name } = user || {};

	router.push(
		`/learning/tests/dashboard/[test_id]?view=admin&id=${id}&name=${name}
		&is_evaluated=${is_evaluated}&status=${status}`,
		`/learning/tests/dashboard/${test_id}?view=admin&id=${id}&name=${name}
		&is_evaluated=${is_evaluated}&status=${status}`,
	);
};

const getAppearedColumns = ({ sortFilter, setSortFilter, router, setShowReAttemptModal, status }) => [

	{
		Header: (
			<div className={styles.container}>
				<div className={styles.item}>NAME</div>
			</div>
		),
		id       : 'user',
		accessor : ({ user = {} }) => <section className={styles.section}>{user?.name}</section>,
	},

	{
		Header   : <div className={styles.container}>PASSED/FAILED</div>,
		id       : 'passed_failed',
		accessor : ({ result_status = '', is_evaluated = false }) => (
			<section className={`${styles.section} ${styles[result_status]}`}>
				{(!is_evaluated || !['published', 'retest'].includes(status))
					? <IsEvaluated is_evaluated={is_evaluated} /> : (startCase(result_status) || '-')}
			</section>
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
		accessor : ({ final_score = '', test = {}, is_evaluated = false }) => (
			<section className={styles.section}>
				{(!is_evaluated || !['published', 'retest'].includes(status))
					? <IsEvaluated is_evaluated={is_evaluated} />
					: `${toFixed(final_score, 2)}/${toFixed(test.total_marks, 2)}`}
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
		accessor : ({ percentile = '', is_evaluated = false }) => (
			<div className={styles.section}>
				{(!is_evaluated || !['published', 'retest'].includes(status))
					? <IsEvaluated is_evaluated={is_evaluated} /> : (toFixed(percentile || 0, 2) || '-')}
			</div>
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
				) : (<div className={styles.section}> - </div>)
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
		accessor : ({ start_time = '' }) => (
			<section className={styles.section}>
				{format(
					start_time,
					`${GLOBAL_CONSTANTS.formats.date['dd MMM yyyy']} ${GLOBAL_CONSTANTS.formats.time['hh:mm aaa']}`,
				)}
			</section>
		),
	},
	{
		Header   : '',
		id       : 'see_more',
		accessor : ({ user = {}, test_id = '', is_evaluated = false }) => (
			<div
				role="presentation"
				onClick={() => handleRedirectToDashboard({ router, user, test_id, is_evaluated, status })}
				className={styles.see_more}
			>
				See More
			</div>
		),
	},
	{
		Header   : '',
		id       : 're-attempt',
		accessor : ({ user = {} }) => (
			(status !== 'published') && (
				<div
					role="presentation"
					onClick={() => setShowReAttemptModal(user)}
					className={styles.see_more}
				>
					Allow Re-Attempt
				</div>
			)
		),
	},
];

const getOngoingColumns = ({ setShowReAttemptModal }) => [
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
	{
		Header   : '',
		id       : 're-attempt',
		accessor : ({ user = {} }) => (
			<div
				role="presentation"
				onClick={() => setShowReAttemptModal(user)}
				className={styles.see_more}
			>
				Allow Re-Attempt
			</div>
		),
	},
];

const getNotAppeardColumns = ({ setShowModal, setUserId }) => [

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
	{
		id       : 'delete',
		accessor : ({ user_id = '' }) => (
			<IcMDelete
				className={styles.delete}
				width={16}
				height={16}
				onClick={() => {
					setUserId(user_id);
					setShowModal(true);
				}}
			>
				Delete
			</IcMDelete>
		),
	},
];

const TABLE_MAPPING = {
	appeared     : getAppearedColumns,
	not_appeared : getNotAppeardColumns,
	ongoing      : getOngoingColumns,
};

const getTableColumns = ({
	sortFilter, setSortFilter,
	activeTab,
	setShowModal,
	setShowReAttemptModal,
	setUserId = () => {},
	router,
	status,
}) => {
	const getcolumnsFun = TABLE_MAPPING?.[activeTab] || getAppearedColumns;

	const getcolumnsArg = {
		appeared     : { sortFilter, setSortFilter, router, setShowReAttemptModal, status },
		not_appeared : { setShowModal, setUserId },
		ongoing      : { setShowReAttemptModal },
	};

	return getcolumnsFun(getcolumnsArg[activeTab] || {});
};

export default getTableColumns;
