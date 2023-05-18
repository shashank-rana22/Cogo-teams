import { SingleDateRange } from '@cogoport/components';
import { IcMCalendar } from '@cogoport/icons-react';
import { useState } from 'react';

import useGetAdminStats from '../../hooks/useGetAdminStats';
import useGetListReferrals from '../../hooks/useGetListReferrals';

import ActivityModal from './ActivityModal';
import ListTables from './ListTables';
import Progress from './Progress';
import styles from './styles.module.css';

function Dashboard() {
	const [date, setDate] = useState(new Date());
	const [activeTab, setActiveTab] = useState('invited');
	const [showPopover, setShowPopover] = useState({});
	const [userDate, setUserData] = useState({});
	const [activityModal, setActivityModal] = useState(false);
	const {
		statsData = {},
		statsLoading = false,
	} = useGetAdminStats({ date });

	const {
		listReferals = {},
		listLoading = false,
		setListPagination = () => {},
		getListReferrals = () => {},
	} = useGetListReferrals({ activeTab });

	return (
		<>
			<div className={styles.header}>

				<div className={styles.title}>Referral Dashboard</div>
				<div className={styles.main_filters}>

					<SingleDateRange
						placeholder="From - To"
						dateFormat="MM/dd/yyyy"
						suffix={(<IcMCalendar />)}
						name="date"
						onChange={setDate}
						value={date}
					/>
				</div>
			</div>
			<Progress statsData={statsData} statsLoading={statsLoading} />
			<div className={styles.table_container}>
				<ListTables
					setActiveTab={setActiveTab}
					activeTab={activeTab}
					listReferals={listReferals}
					setListPagination={setListPagination}
					listLoading={listLoading}
					getListReferrals={getListReferrals}
					showPopover={showPopover}
					setShowPopover={setShowPopover}
					setActivityModal={setActivityModal}
					setUserData={setUserData}
				/>
			</div>

			<ActivityModal
				activityModal={activityModal}
				setActivityModal={setActivityModal}
				userDate={userDate}
			/>

		</>
	);
}

export default Dashboard;
