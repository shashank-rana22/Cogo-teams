import { Tooltip, ButtonIcon, Pill, Button, cl } from '@cogoport/components';
import { IcMUpload, IcMExclamation, IcMArrowNext, IcMDownload, IcMArrowRight } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';
import { isEmpty, getYear, getMonth, format, startCase } from '@cogoport/utils';

import redirectPathSourceMapping from '../../constants/redirect-source-mapping';

import FeedbackFormModal from './FeedbackFormModal';
import FeedbackModal from './FeedbackPopOver';
import ReassignManagerModal from './ReassignManagerModal';
import styles from './styles.module.css';

const statusColorMapping = {
	pip       : 'red',
	employed  : 'green',
	probation : 'yellow',
	exited    : 'red',
};

const useGetColumns = ({
	getTeamFeedbackList = () => {},
	refetchList = () => {},
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
		setItem({
			...item,
			tags         : item?.tags || [],
			disabledTags : item?.tags || [],
		});
		if (item.log_type === 'probation' && !item.final_decision) {
			setModal('update');
		} else {
			setModal('logs');
		}
	};

	const openCSV = (url) => {
		if (url) { window.open(url, '_blank'); }
	};

	const downloadError = (url) => {
		if (url) { window.open(url, '_blank'); }
	};

	const currentDate = new Date();
	const currentMonth = getMonth(currentDate);
	const currentYear = getYear(currentDate);

	const feedbackMonth = currentMonth > 0 ? currentMonth - 1 : 11;
	const feedbackYear = currentMonth > 0 ? currentYear : currentYear - 1;

	const columns = [{
		Header   : <div className={styles.head}>{source === 'uploaded_files' ? 'FILE NAME' : 'REPORTEE NAME'}</div>,
		accessor : (item) => (
			<div className={styles.head_content}>
				<div
					className={styles.container}
				>
					{source === 'uploaded_files' ? item.file_name : startCase(item.name || '---')}
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
				{startCase(item.cogo_id || '-')}
			</div>
		),
		id  : 'cogo_id',
		key : 'cogo_id',
	},

	{
		Header   : <div className={styles.head}>DEPARTMENT</div>,
		accessor : (item) => (
			<div className={styles.head_content}>
				{startCase(item.department || '-')}
			</div>
		),
		id  : 'department',
		key : 'department',
	},

	{
		Header   : <div className={styles.head}>DESIGNATION</div>,
		accessor : (item) => (
			<div className={styles.head_content}>
				{startCase(item.designation || '-')}
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
					{item.score || '-'}
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
			<FeedbackModal feedback={item.feedback} />
		),
		id  : 'feedback',
		key : 'feedback',
	},
	{
		Header   : <div className={styles.head}>MONTH</div>,
		accessor : () => (
			<div className={styles.head_content}>
				{format(new Date(feedbackYear, feedbackMonth, 1), 'MMM yyyy')}
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
		Header   : <div className={styles.head}>LAST FORM</div>,
		accessor : (item) => (
			<div className={styles.head_content}>
				<FeedbackFormModal
					action="show"
					item={item}
					getTeamFeedbackList={getTeamFeedbackList}
					feedbackYear={feedbackYear}
					feedbackMonth={feedbackMonth}
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
				<div>{item.manager_name ? item.manager_name : item.hr_manager_name}</div>
			</div>
		),
		id  : 'manager',
		key : 'manager',
	},
	{
		Header   : <div className={styles.head} />,
		accessor : (item) => (
			<div className={styles.head_content}>
				<Button onClick={() => handleClick(item.user_id)} themeType="link">
					View Details
					{' '}
					<IcMArrowNext style={{ marginLeft: '8px' }} />
				</Button>
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

			const incompleteTags = Array(len).fill('').map((_, index) => index);

			return (
				(item.log_type === 'pip' && (
					<div className={styles.head_content}>
						{(tags || []).map((val) => (
							<Tooltip
								content={<div style={{ wordBreak: 'break-word' }}>{val}</div>}
								placement="bottom"
								key={val}
							>
								<div className={styles.green_dot} />
							</Tooltip>
						))}

						{(incompleteTags || []).map((i) => <div className={styles.dot} key={i} />)}

					</div>
				))
			);
		},
		id  : 'progress',
		key : 'progress',
	},
	{
		Header   : <div className={styles.head} />,
		accessor : (item) => (
			<div className={styles.head_content}>
				<ReassignManagerModal item={item} refetchList={refetchList} />
			</div>
		),
		id  : 'reassign_manager',
		key : 'reassign_manager',
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
		Header   : <div className={styles.head}>ACTION</div>,
		accessor : (item) => (
			<div className={styles.head_content}>
				<Button
					themeType={item.log_type === 'probation' && !item.final_decision ? 'primary' : 'secondary'}
					onClick={() => addLog(item)}
				>
					{item.log_type === 'probation' && !item.final_decision ? 'Update' : 'Log'}
				</Button>
			</div>
		),
		id  : 'action',
		key : 'action',
	},
	{
		Header   : <div className={styles.head}>STATUS</div>,
		accessor : (item) => (
			<div className={styles.head_content}>
				<Pill
					color={statusColorMapping[item.employment_status]}
				>
					{startCase(item.employment_status || 'Not Known')}
				</Pill>
			</div>
		),
		id  : 'employment_status',
		key : 'employment_status',
	},
	{
		Header   : <div className={styles.head}>STATUS</div>,
		accessor : (item) => (
			<div className={styles.head_content}>
				<Pill
					color={item.final_decision === 'confirmed' ? 'green' : 'yellow'}
				>
					{isEmpty(item.final_decision)
						? (`in ${item.log_type}`) : (`${item.log_type} ${item.final_decision}`)}

				</Pill>
			</div>
		),
		id  : 'status',
		key : 'status',
	},
	{
		Header   : <div className={styles.head}>REVIEW</div>,
		accessor : (item) => (
			<div className={styles.head_content}>
				<Button
					themeType="tertiary"
					onClick={() => {
						setItem(item);
						setModal('review');
					}}
					disabled={!item.final_decision}
				>
					Review
				</Button>
			</div>
		),
		id  : 'review',
		key : 'review',
	},
	{
		Header   : <div className={styles.head}>{source === 'uploaded_files' ? 'UPLOAD DATE' : 'START DATE'}</div>,
		accessor : (item) => (
			<div className={styles.head_content}>
				{item.created_at || item.start_date ? (
					<div>
						{source === 'uploaded_files'
							? format(item.created_at, 'dd-MMM-yyyy')
							: format(item.start_date, 'dd-MMM-yyyy')}
					</div>
				) : '---'}
			</div>
		),
		id  : 'start_date',
		key : 'start_date',
	},
	{
		Header   : <div className={styles.head}>END DATE</div>,
		accessor : (item) => (
			<div className={styles.head_content}>
				{item.end_date ? format(item.end_date, 'dd-MMM-yyyy') : '---'}
			</div>
		),
		id  : 'end_date',
		key : 'end_date',
	},
	{
		Header   : <div className={styles.head}>CSV TYPE</div>,
		accessor : (item) => (
			<div className={styles.head_content}>
				<div>
					{`${item.csv_type === 'approve_ratings' ? 'Normalization'
						: startCase(item.csv_type || '--')}`}
				</div>
			</div>
		),
		id  : 'upload_type',
		key : 'upload_type',
	},
	{
		Header   : <div className={styles.head}>EMPLOYEES AFFECTED</div>,
		accessor : (item) => (
			<div className={styles.head_content}>
				{item.employee_count || '-'}
			</div>
		),
		id  : 'number_of_employees',
		key : 'number_of_employees',
	},
	{
		Header   : <div className={styles.head}>UPLOADED BY</div>,
		accessor : (item) => (
			<div className={styles.head_content}>
				{startCase(item.uploaded_by || '---')}
			</div>
		),
		id  : 'uploaded_by',
		key : 'uploaded_by',
	},
	{
		Header   : <div className={styles.head}>Error Report</div>,
		accessor : (item) => (
			<div className={styles.head_content}>
				{item.error_url && (
					<div className={styles.error_button}>
						<Tooltip
							content={(
								<div
									style={{ wordBreak: 'break-word' }}
								>
									Download Error Report
								</div>
							)}
							placement="bottom"
						>
							<ButtonIcon
								onClick={() => downloadError(item.error_url)}
								themeType="secondary"
								icon={<IcMExclamation height="20px" width="20px" />}
								size="sm"
							/>
						</Tooltip>
					</div>
				)}

			</div>
		),
		id  : 'error_report',
		key : 'error_report',
	},
	{
		Header   : <div className={styles.head} />,
		accessor : (item) => (
			<div className={styles.head_content}>
				{item.error_url && (
					<Button
						themeType="secondary"
						size="sm"
						onClick={() => {
							setItem(item);
							setModal('upload');
						}}
					>
						<IcMUpload style={{ marginRight: '4px' }} />
						Reupload
					</Button>
				)}

			</div>
		),
		id  : 'reupload',
		key : 'reupload',
	},
	{
		Header   : <div className={styles.head} />,
		accessor : (item) => (
			<div className={styles.head_content}>
				<ButtonIcon icon={<IcMDownload />} onClick={() => openCSV(item.csv_url)} />
			</div>
		),
		id  : 'download_csv',
		key : 'download_csv',
	},
	];

	const finalColumns = [];

	columnsToShow.forEach((item) => {
		const column = columns.find((col) => col.id === item);
		finalColumns.push(column);
	});

	return finalColumns;
};

export default useGetColumns;
