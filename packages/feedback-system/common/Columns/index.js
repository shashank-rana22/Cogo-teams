import { cl } from '@cogoport/components';
import { useRouter } from '@cogoport/next';
import { format, startCase } from '@cogoport/utils';
import { useMemo } from 'react';

import FeedbackFormModal from './FeedbackFormModal';
import FeedbackPopOver from './FeedbackPopOver';
import styles from './styles.module.css';

const redirectPathSourceMapping = {
	hr_dashboard: {
		forwardPath : '/feedback-system/hr-dashboard/feedback-management',
		returnPath  : '/feedback-system/hr-dashboard',
	},
	hr_feedback: {
		forwardPath : '/feedback-system/hr-dashboard/feedback-management',
		returnPath  : '/feedback-system/hr-dashboard/feedback-management',
	},
	manager_dashboard: {
		forwardPath : '/feedback-system/manager-dashboard/feedback-management',
		returnPath  : '/feedback-system/manager-dashboard',
	},
	manager_feedback: {
		forwardPath : '/feedback-system/manager-dashboard/feedback-management',
		returnPath  : '/feedback-system/manager-dashboard/feedback-management',
	},
};

const useGetColumns = ({ getTeamFeedbackList = () => {}, source = 'hr_dashboard' }) => {
	const Router = useRouter();
	const handleClick = (user_id) => {
		const { forwardPath, returnPath = '/feedback-system/user-dashboard' } = redirectPathSourceMapping[source];

		if (forwardPath) {
			Router.push(
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

	const columnsToShow = [{
		Header   : <div className={styles.head}>Name</div>,
		accessor : (item) => (
			<div className={styles.head_content}>
				<div
					className={styles.container}
					role="button"
					tabIndex={0}
					onClick={() => {
						handleClick(item?.user_id);
					}}
				>
					{startCase(item?.name)}
				</div>
			</div>
		),
		id  : 'name',
		key : 'name',
	},

	{
		Header   : <div className={styles.head}>Role</div>,
		accessor : (item) => (
			<div className={styles.head_content}>
				<div>{startCase(item?.work_scope) || '-'}</div>
			</div>
		),
		id  : 'role',
		key : 'role',
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
		Header   : <div className={styles.head}>Feedback</div>,
		accessor : (item) => (
			<FeedbackPopOver feedback={item?.feedback} />
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
	}];

	if (source === 'hr_dashboard') {
		columnsToShow.push({
			Header   : <div className={styles.head}>Manager</div>,
			accessor : (item) => (
				<div className={styles.head_content}>
					<div>{item?.manager}</div>
				</div>
			),
			id  : 'manager',
			key : 'manager',
		});
	}

	if (source === 'manager_feedback') {
		columnsToShow.push({
			Header   : <div className={styles.head}>Feedback Form</div>,
			accessor : (item) => (
				<div className={styles.head_content}>
					<FeedbackFormModal
						userId={item?.user_id}
						performanceItem={item?.performance_item}
						feedback={item?.feedback}
						feedbackId={item?.id}
						getTeamFeedbackList={getTeamFeedbackList}
					/>
				</div>
			),
			id  : 'add-kpi',
			key : 'add-kpi',
		});
	}
	return useMemo(() => columnsToShow, []);
};

export default useGetColumns;
