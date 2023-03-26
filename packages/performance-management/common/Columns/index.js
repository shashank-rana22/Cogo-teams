import { Tooltip, ButtonIcon, Pill, Button, cl } from '@cogoport/components';
import { IcMArrowRight } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';
import { isEmpty, getYear, getMonth, format, startCase } from '@cogoport/utils';
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

// const updateColorMapping = {
// 	confirmed : 'green',
// 	exited    : 'red',
// 	uploaded  : 'green',
// 	error     : 'red',
// 	extended  : 'yellow',
// };

const useGetColumns = ({
	getTeamFeedbackList = () => {},
	source = 'hr_dashboard',
	columnsToShow = [],
	setRefetchReportees = () => {},
	setItem = () => {},
	setModal = () => {},
	activeTab,
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
		if (item?.log_type === 'probation') {
			setModal('update');
		} else {
			setModal('logs');
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
		Header   : <div className={styles.head}>{activeTab === 'uploaded_files' ? ('Uploaded By') : ('MANAGER')}</div>,
		accessor : (item) => (
			<div className={styles.head_content}>
				<div>{item?.manager_name ? (item?.manager_name) : (item?.hr_manager_name)}</div>
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
		Header  	: <div className={styles.head}>Progress</div>,
		accessor : (item) => {
			const { tags } = item;
			const len = 3 - (tags || []).length;
			console.log('tags', tags);

			console.log('len', len);

			return (
				<div className={styles.head_content}>
					{tags?.map((val) => (
						<Tooltip
							content={val}
							placement="bottom"
						>
							<div className={styles.green_dot} />
						</Tooltip>
					))}

					{Array(len).fill('').map(() => (
						// <Tooltip
						// 	content="Email sent to Employee"
						// 	placement="bottom"
						// >
						<div className={styles.dot} />
						// </Tooltip>
					))}

				</div>
			);
		},
		id  : 'progress',
		key : 'progress',
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
		id  : 'add_create_arrow',
		key : 'add_create_arrow',
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
		Header   : <div className={styles.head}>Action</div>,
		accessor : (item) => (
			<div className={styles.head_content}>
				<Button
					themeType={
						(item?.log_type === 'pip') ? ('secondary') : ('primary')
					}
					onClick={() => addLog(item)}
					disabled={(item?.employee_status === 'probation' && source === 'manager_dashboard')}
				>
					{item?.log_type === 'probation' ? 'Update' : 'Log'}
				</Button>
			</div>
		),
		id  : 'action',
		key : 'action',
	},
	{
		Header   : <div className={styles.head}>Status</div>,
		accessor : (item) => (
			<div className={styles.head_content}>
				<Pill
					color={item?.log_type === 'pip' ? 'yellow' : 'blue'}
				>
					{isEmpty(item?.final_decision)
						? (`in ${item?.log_type}`) : (`${item?.log_type} ${item?.final_decision}`)}

				</Pill>
			</div>
		),
		id  : 'status',
		key : 'status',
	},
	{
		Header   : <div className={styles.head}>LOGS</div>,
		accessor : (item) => (
			<div className={styles.head_content}>
				<Button
					themeType="tertiary"
					style={{ color: 'blue' }}
					onClick={() => {
						setItem(item);
						setModal('review');
					}}
				>
					Review
				</Button>
			</div>
		),
		id  : 'review',
		key : 'review',
	},
	{
		Header   : <div className={styles.head}>Start Date</div>,
		accessor : (item) => (
			<div className={styles.head_content}>
				<div>
					{item?.upload_date
						? format(item?.upload_date, 'dd-MMM-yyyy')
						: format(item?.start_date, 'dd-MMM-yyyy')}

				</div>
			</div>
		),
		id  : 'start_date',
		key : 'start_date',
	},
	{
		Header   : <div className={styles.head}>End Date</div>,
		accessor : (item) => (
			<div className={styles.head_content}>
				<div>{format(item?.end_date, 'dd-MMM-yyyy')}</div>
			</div>
		),
		id  : 'end_date',
		key : 'end_date',
	},
	// {
	// 	Header   : <div className={styles.head}>Decision</div>,
	// 	accessor : (item) => (
	// 		<div className={styles.head_content}>
	// 			{item?.final_decision && (
	// 				<Pill
	// 					color={updateColorMapping[item?.final_decision] ? (updateColorMapping[item?.update]) : 'blue'}
	// 				>
	// 					{startCase(item?.final_decision)}

	// 				</Pill>
	// 			)}
	// 		</div>
	// 	),
	// 	id  : 'update',
	// 	key : 'update',
	// },
	{
		Header   : <div className={styles.head}>Upload Status</div>,
		accessor : (item) => (
			<div className={styles.head_content}>
				<div>{`${item?.log_type} CSV`}</div>
			</div>
		),
		id  : 'upload_type',
		key : 'upload_type',
	},
	{
		Header   : <div className={styles.head}>NUMBER OF EMPLOYEES</div>,
		accessor : (item) => (
			<div className={styles.head_content}>
				{item?.number_of_emplyees || '-'}
			</div>
		),
		id  : 'number_of_employees',
		key : 'number_of_employees',
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
