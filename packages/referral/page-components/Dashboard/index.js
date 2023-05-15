import { Select, SingleDateRange } from '@cogoport/components';
import { IcMCalendar } from '@cogoport/icons-react';
import { useState } from 'react';

import { USER_TYPES } from '../../constants';
import useGetAdminStats from '../../hooks/useGetAdminStats';
import useGetListReferrals from '../../hooks/useGetListReferrals';

import ListTables from './ListTables';
import Progress from './Progress';
import styles from './styles.module.css';

function Dashboard() {
	const [userType, setUserType] = useState('');
	const [date, setDate] = useState(new Date());
	const [searchValue, setSearchValue] = useState('');
	const [activeTab, setActiveTab] = useState('invited');
	const [filter, setFilter] = useState('');

	const {
		statsData = {},
		statsLoading = false,
	} = useGetAdminStats({ date, userType });

	const {
		listReferals = {},
		listLoading = false,
		setListPagination = () => {},
		getListReferrals = () => {},
	} = useGetListReferrals({ filter, searchValue, activeTab });

	return (
		<>
			<div className={styles.header}>

				<div className={styles.title}>Referral Dashboard</div>
				<div className={styles.main_filters}>
					<Select
						value={userType}
						onChange={setUserType}
						placeholder="Select users here"
						options={USER_TYPES}
						className={styles.select_field}
						isClearable
					/>
					<SingleDateRange
						placeholder="From - To"
						dateFormat="MM/dd/yyyy"
						suffix={<IcMCalendar />}
						name="date"
						onChange={setDate}
						value={date}
					/>
				</div>
			</div>
			<Progress statsData={statsData} statsLoading={statsLoading} />
			<div className={styles.table_container}>
				<ListTables
					searchValue={searchValue}
					setSearchValue={setSearchValue}
					setActiveTab={setActiveTab}
					activeTab={activeTab}
					setFilter={setFilter}
					filter={filter}
					listReferals={listReferals}
					setListPagination={setListPagination}
					listLoading={listLoading}
					getListReferrals={getListReferrals}
				/>
			</div>

		</>
	);
}

export default Dashboard;
