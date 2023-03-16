import { ButtonIcon, Pill, Button, cl } from '@cogoport/components';
import { IcMArrowRight } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';
import { getYear, getMonth, format, startCase } from '@cogoport/utils';
import { useMemo } from 'react';

import redirectPathSourceMapping from '../../constants/redirect-source-mapping';

import FeedbackFormModal from './FeedbackFormModal';
import FeedbackModal from './FeedbackPopOver';
import styles from './styles.module.css';

const statusColorMapping = {
	probation : 'red',
	employed  : 'green',
	young     : 'yellow',
};

const useGetColumns = ({
	getTeamFeedbackList = () => {}, source = 'hr_dashboard', columnsToShow = [],
	setRefetchReportees = () => {}, setItem = () => {}, setOpenUpdate = () => {},
}) => {
	const router = useRouter();
	const handleClick = (user_id) => {
		const {
			forwardPath,
			returnPath = '/performance-management/user-dashboard',
		} =	redirectPathSourceMapping[source];

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

	const addLog = (item) => {
		setItem(item);
		if (source !== 'log_modal') {
			setOpenUpdate(true);
		}
	};

	const currentDate = new Date();
	const currentMonth = getMonth(currentDate);
	const currentYear = getYear(currentDate);

	const feedbackMonth = currentMonth > 0 ? currentMonth - 1 : 11;
	const feedbackYear = currentMonth > 0 ? currentYear : currentYear - 1;

	const columns = [{
		Header   : <div className={styles.head}>REPORTEE NAME</div>,
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
		Header   : <div className={styles.head}>DEPARTMENT</div>,
		accessor : (item) => (
			<div className={styles.head_content}>
				<div>{startCase(item?.department) || '-'}</div>
			</div>
		),
		id  : 'department',
		key : 'department',
	},

	{
		Header   : <div className={styles.head}>DESIGNATION</div>,
		accessor : (item) => (
			<div className={styles.head_content}>
				<div>{startCase(item?.designation) || '-'}</div>
			</div>
		),
		id  : 'designation',
		key : 'designation',
	},

	{
		Header   : <div className={styles.head}>RATING</div>,
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
		Header   : <div className={styles.head}>SCORE</div>,
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
		Header   : <div className={styles.head}>MONTH</div>,
		accessor : () => (
			<div className={styles.head_content}>
				<div>{format(new Date(feedbackYear, feedbackMonth, 1), 'MMM yyyy')}</div>
			</div>
		),
		id  : 'month',
		key : 'month',
	},
	{
		Header   : <div className={styles.head}>FEEDBACK FORM</div>,
		accessor : (item) => (
			<div className={styles.head_content}>
				<FeedbackFormModal
					item={item}
					getTeamFeedbackList={getTeamFeedbackList}
					setRefetchReportees={setRefetchReportees}
					feedbackYear={feedbackYear}
					feedbackMonth={feedbackMonth}
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
		Header   : <div className={styles.head}>MANAGER</div>,
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
	{
		Header   : <div className={styles.head}>Employee Status</div>,
		accessor : (item) => (
			<div className={styles.head_content}>
				<Pill color={statusColorMapping[item?.employee_status]}>{startCase(item?.employee_status)}</Pill>
			</div>
		),
		id  : 'employee_status',
		key : 'employee_status',
	},
	{
		Header   : <div className={styles.head}>PIP Status</div>,
		accessor : (item) => (
			<div className={styles.head_content}>
				<Pill
					color={item?.is_pip ? 'red' : 'green'}
				>
					{item.is_pip ? 'In PIP' : 'Out Of Pip'}

				</Pill>
			</div>
		),
		id  : 'is_pip',
		key : 'is_pip',
	},
	{
		Header   : <div className={styles.head} />,
		accessor : (item) => (
			<div className={styles.head_content}>
				<ButtonIcon onClick={() => addLog(item)} icon={<IcMArrowRight />} />
			</div>
		),
		id  : 'add_log_arrow',
		key : 'add_log_arrow',
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
	{
		Header   : <div className={styles.head} />,
		accessor : (item) => (
			<div className={styles.head_content}>
				<Button
					onClick={() => addLog(item)}
					disabled={(item?.is_pip && source === 'hr_dashboard')
					|| (item?.employee_status === 'probation' && source === 'manager_dashboard')}
				>
					Update
				</Button>
			</div>
		),
		id  : 'action',
		key : 'action',
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
