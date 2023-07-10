import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMDelete } from '@cogoport/icons-react';
import { startCase, format } from '@cogoport/utils';

import toFixed from '../../../../CreateModule/utils/toFixed';
import SortComponent from '../../../commons/SortComponent';

import IsEvaluated from './IsEvaluated';
import styles from './styles.module.css';

const ROUND_OFF_DIGITS = 2;

const SINGULAR_VALUE = 1;

const handleRedirectToDashboard = ({ router, user, test_id, is_evaluated, status }) => {
	const { id, name } = user || {};

	router.push(
		`/learning/tests/dashboard/[test_id]?view=admin&id=${id}&name=${name}
		&is_evaluated=${is_evaluated}&status=${status}`,
		`/learning/tests/dashboard/${test_id}?view=admin&id=${id}&name=${name}
		&is_evaluated=${is_evaluated}&status=${status}`,
	);
};

const showResult = (is_evaluated, activeAttempt, status, retest) => {
	if (!is_evaluated) {
		return false;
	}
	if (activeAttempt === 'attempt1') {
		if (retest) return true;
		if (status === 'published') return true;
		return false;
	}
	if (activeAttempt === 'retest' && status === 'published') {
		return true;
	}
	return false;
};

const getAppearedColumns = ({
	sortFilter,
	setSortFilter,
	router,
	setShowReAttemptModal,
	status,
	activeAttempt,
	retest,
}) => [

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
				{showResult(is_evaluated, activeAttempt, status, retest)
					? (startCase(result_status) || '-') : <IsEvaluated is_evaluated={is_evaluated} />}
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
				{showResult(is_evaluated, activeAttempt, status, retest)
					? `${toFixed(final_score, ROUND_OFF_DIGITS)}/${toFixed(test.total_marks, ROUND_OFF_DIGITS)}`
					: <IsEvaluated is_evaluated={is_evaluated} />}
			</section>
		),
	},
	{
		Header: (
			<div className={styles.container}>
				<div className={styles.item}>PERCENTAGE</div>

				<SortComponent
					value="final_score"
					sortFilter={sortFilter}
					setSortFilter={setSortFilter}
				/>
			</div>
		),
		id       : 'percentage',
		accessor : ({ final_score = '', test = {}, is_evaluated = false }) => (
			<section className={styles.section}>
				{showResult(is_evaluated, activeAttempt, status, retest)
					? `${toFixed(final_score / test.total_marks, ROUND_OFF_DIGITS)}`
					: <IsEvaluated is_evaluated={is_evaluated} />}
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
		accessor : ({ percentile = 0, is_evaluated = false }) => (
			<div className={styles.section}>
				{showResult(is_evaluated, activeAttempt, status, retest)
					? (toFixed(percentile, ROUND_OFF_DIGITS) || '-') : <IsEvaluated is_evaluated={is_evaluated} />}
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

			return time_taken ? (
				<div className={styles.section}>
					{timeTaken}
					{' '}
					{timeTaken > SINGULAR_VALUE ? 'mins' : 'min'}
				</div>
			) : <div className={styles.section}> - </div>;
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
				onClick={
					() => handleRedirectToDashboard({ router, user, test_id, is_evaluated, status, activeAttempt })
}
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
	activeAttempt,
	retest,
}) => {
	const getcolumnsFun = TABLE_MAPPING?.[activeTab] || getAppearedColumns;

	const getcolumnsArg = {
		appeared     : { sortFilter, setSortFilter, router, setShowReAttemptModal, status, activeAttempt, retest },
		not_appeared : { setShowModal, setUserId },
		ongoing      : { setShowReAttemptModal },
	};

	return getcolumnsFun(getcolumnsArg[activeTab] || {});
};

export default getTableColumns;
