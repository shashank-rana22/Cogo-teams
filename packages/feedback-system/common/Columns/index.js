import { Button, cl } from '@cogoport/components';
import { useRouter } from '@cogoport/next';
import { format, startCase } from '@cogoport/utils';
import { useMemo } from 'react';

import redirectPathSourceMapping from '../../constants/redirect-source-mapping';

import FeedbackFormModal from './FeedbackFormModal';
import FeedbackModal from './FeedbackPopOver';
import styles from './styles.module.css';

const useGetColumns = ({
	getTeamFeedbackList = () => {}, source = 'hr_dashboard', columnsToShow = [],
	setRefetchReportees = () => {},
}) => {
	const router = useRouter();
	const handleClick = (user_id) => {
		const { forwardPath, returnPath = '/feedback-system/user-dashboard' } = redirectPathSourceMapping[source];

		if (forwardPath) {
			router.push(
				`${forwardPath}/[user_id]?path=${returnPath}`,
				`${forwardPath}/${user_id}?path=${returnPath}`,
			);
		}
	};

	const ratingClass = (value) => {
		if ([1, 2].includes(value)) { return 'improvement_needed'; }
		if ([4, 5].includes(value)) { return 'good_performance'; }
		return 'average';
	};

	const columns = [{
		Header   : <div className={styles.head}>Reportee Name</div>,
		accessor : (item) => (
			<div className={styles.head_content}>
				<div
					className={styles.container}
				>
					{startCase(item?.name)}
				</div>
			</div>
		),
		id  : 'name',
		key : 'name',
	},
	{
		Header   : <div className={styles.head}>ID</div>,
		accessor : (item) => (
			<div className={styles.head_content}>
				<div>{startCase(item?.cogo_id) || '-'}</div>
			</div>
		),
		id  : 'cogo_id',
		key : 'cogo_id',
	},

	{
		Header   : <div className={styles.head}>Department</div>,
		accessor : (item) => (
			<div className={styles.head_content}>
				<div>{startCase(item?.department) || '-'}</div>
			</div>
		),
		id  : 'department',
		key : 'department',
	},

	{
		Header   : <div className={styles.head}>Designation</div>,
		accessor : (item) => (
			<div className={styles.head_content}>
				<div>{startCase(item?.designation) || '-'}</div>
			</div>
		),
		id  : 'designation',
		key : 'designation',
	},

	{
		Header   : <div className={styles.head}>Rating</div>,
		accessor : (item) => (
			<div className={styles.head_content}>
				<div className={cl`styles.${ratingClass(item?.rating)}`}>
					{item?.rating || '-'}
				</div>
				{' '}
			</div>
		),
		id  : 'rating',
		key : 'rating',
	},

	{
		Header   : <div className={styles.head}>Score</div>,
		accessor : (item) => (
			<div className={styles.head_content}>
				<div className={cl`styles.${ratingClass(item?.score)}`}>
					{item?.score || '-'}
				</div>
				{' '}
			</div>
		),
		id  : 'score',
		key : 'score',
	},
	{
		Header   : <div className={styles.head} />,
		accessor : (item) => (
			<FeedbackModal feedback={item?.feedback} />
		),
		id  : 'feedback',
		key : 'feedback',
	},
	{
		Header   : <div className={styles.head}>Month</div>,
		accessor : (item) => (
			<div className={styles.head_content}>
				<div>{format(item?.created_at, 'MMM yyyy')}</div>
			</div>
		),
		id  : 'month',
		key : 'month',
	},
	{
		Header   : <div className={styles.head}>Feedback Form</div>,
		accessor : (item) => (
			<div className={styles.head_content}>
				<FeedbackFormModal
					item={item}
					getTeamFeedbackList={getTeamFeedbackList}
					setRefetchReportees={setRefetchReportees}
				/>
			</div>
		),
		id  : 'add-kpi',
		key : 'add-kpi',
	},
	{
		Header   : <div className={styles.head} />,
		accessor : (item) => (
			<div className={styles.head_content}>
				<FeedbackFormModal
					action="show"
					item={item}
					getTeamFeedbackList={getTeamFeedbackList}
				/>
			</div>
		),
		id  : 'view_form',
		key : 'view_form',
	},
	{
		Header   : <div className={styles.head}>Manager</div>,
		accessor : (item) => (
			<div className={styles.head_content}>
				<div>{item?.manager_name}</div>
			</div>
		),
		id  : 'manager',
		key : 'manager',
	},
	{
		Header   : <div className={styles.head} />,
		accessor : (item) => (
			<div className={styles.head_content}>
				<Button onClick={() => handleClick(item.user_id)} themeType="link">View Details</Button>
			</div>
		),
		id  : 'user_details',
		key : 'user_details',
	},
	];

	const finalColumns = [];

	columnsToShow.forEach((item) => {
		const column = columns.find((col) => col.id === item);
		finalColumns.push(column);
	});

	// eslint-disable-next-line react-hooks/exhaustive-deps
	return useMemo(() => finalColumns, []);
};

export default useGetColumns;
