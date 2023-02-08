import { cl } from '@cogoport/components';
import { useRouter } from '@cogoport/next';
import { format, startCase } from '@cogoport/utils';
import { useMemo } from 'react';

import FeedbackPopOver from './FeedbackPopOver';
import RatingDetailsModal from './RatingDetailsModal';
import styles from './styles.module.css';

const useGetColumns = () => {
	const Router = useRouter();
	const handleClick = (user_id) => {
		Router.push(
			'/feedback-system/hr-dashboard/feedback-management/[user_id]?path=/feedback-hr-dashboard',
			`/feedback-system/hr-dashboard/feedback-management/${user_id}?path=/feedback-hr-dashboard`,
		);
	};
	const ratingClass = ({ value }) => {
		if ([1, 2].includes(value)) { return 'improvement_needed'; }
		if ([4, 5].includes(value)) { return 'good_performance'; }
		return 'average';
	};

	return useMemo(() => [
		{
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
						{startCase(item?.user_name)}
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
					{' '}
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
			Header   : <div className={styles.head}>Rating Details</div>,
			accessor : (item) => (
				<RatingDetailsModal performance_item={item?.performance_item} />
			),
			id  : 'rating_details',
			key : 'rating_details',
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
					{' '}
				</div>
			),
			id  : 'month',
			key : 'month',
		},

		{
			Header   : <div className={styles.head}>Manager</div>,
			accessor : (item) => (
				<div className={styles.head_content}>
					<div>{item?.manager}</div>
					{' '}
				</div>
			),
			id  : 'manager',
			key : 'manager',
		},
	], []);
};

export default useGetColumns;
