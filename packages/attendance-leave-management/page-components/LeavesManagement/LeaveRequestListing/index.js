import DesktopView from './DesktopView';
import MobileView from './MobileView';
import styles from './styles.module.css';

const dataArr = [
	{
		leave_type : 'Privilege Leave',
		from_date  : '2023-07-05',
		to_date    : '2023-07-06',
		total_days : 1,
		remarks    : null,
		approver   : 'Ankur Verma',
		status     : 'pending',
	},
	{
		leave_type : 'Privilege Leave',
		from_date  : '2023-06-10',
		to_date    : '2023-06-11',
		total_days : 2,
		remarks    : 'Vacation',
		approver   : 'Emily Johnson',
		status     : 'approved',
	},
	{
		leave_type : 'Sick Leave',
		from_date  : '2023-08-15',
		to_date    : '2023-08-16',
		total_days : 2,
		remarks    : 'Fever',
		approver   : 'Michael Smith',
		status     : 'approved',
	},
	{
		leave_type : 'Vacation',
		from_date  : '2023-09-25',
		to_date    : '2023-09-30',
		total_days : 6,
		remarks    : 'Traveling',
		approver   : 'Sarah Williams',
		status     : 'approved',
	},
	{
		leave_type : 'Sick Leave',
		from_date  : '2023-07-18',
		to_date    : '2023-07-19',
		total_days : 2,
		remarks    : 'Cold',
		approver   : 'David Miller',
		status     : 'rejected',
	},
	{
		leave_type : 'Casual Leave',
		from_date  : '2023-05-05',
		to_date    : '2023-05-05',
		total_days : 1,
		remarks    : 'Personal reasons',
		approver   : 'Anna Lee',
		status     : 'approved',
	},
	{
		leave_type : 'Vacation',
		from_date  : '2023-10-10',
		to_date    : '2023-10-15',
		total_days : 6,
		remarks    : 'Annual trip',
		approver   : 'Robert Brown',
		status     : 'pending',
	},
	{
		leave_type : 'Casual Leave',
		from_date  : '2023-09-02',
		to_date    : '2023-09-02',
		total_days : 1,
		remarks    : 'Attending an event',
		approver   : 'Jessica Clark',
		status     : 'rejected',
	},
	{
		leave_type : 'Privilege Leave',
		from_date  : '2023-08-05',
		to_date    : '2023-08-08',
		total_days : 4,
		remarks    : 'Family function',
		approver   : 'William Turner',
		status     : 'approved',
	},
	{
		leave_type : 'Sick Leave',
		from_date  : '2023-06-20',
		to_date    : '2023-06-21',
		total_days : 2,
		remarks    : 'Stomachache',
		approver   : 'Olivia Martinez',
		status     : 'pending',
	},
];

function LeaveRequestListing() {
	return (
		<div className={styles.container}>
			<div className={styles.heading_container}>
				<div className={styles.heading}>Leave requests</div>
				<div className={styles.sub_heading}>
					Status of all leaves applied
				</div>
			</div>
			<div className={styles.desktop_view}>
				<DesktopView dataArr={dataArr} />
			</div>
			<div className={styles.mobile_view}>
				<MobileView dataArr={dataArr} />
			</div>
		</div>
	);
}

export default LeaveRequestListing;
