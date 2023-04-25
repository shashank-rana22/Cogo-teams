import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals.json';
import { IcMDelete } from '@cogoport/icons-react';
import { startCase, format } from '@cogoport/utils';

import toFixed from '../../../../CreateModule/utils/toFixed';
import SortComponent from '../../../commons/SortComponent';

import styles from './styles.module.css';

const handleRedirectToDashboard = ({ router, user, test_id }) => {
	const { id, name } = user || {};

	router.push(
		`/learning/tests/dashboard/[test_id]?view=admin&id=${id}&name=${name}`,
		`/learning/tests/dashboard/${test_id}?view=admin&id=${id}&name=${name}`,
	);
};

const getAppearedColumns = ({ sortFilter, setSortFilter, router, setShowReAttemptModal }) => [
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
		accessor : ({ user = {}, test_id = '' }) => (
			<div
				role="presentation"
				onClick={() => handleRedirectToDashboard({ router, user, test_id })}
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
}) => {
	const getcolumnsFun = TABLE_MAPPING?.[activeTab] || getAppearedColumns;

	const getcolumnsArg = {
		appeared     : { sortFilter, setSortFilter, router, setShowReAttemptModal },
		not_appeared : { setShowModal, setUserId },
		ongoing      : { setShowReAttemptModal },
	};

	return getcolumnsFun(getcolumnsArg[activeTab] || {});
};

export default getTableColumns;
