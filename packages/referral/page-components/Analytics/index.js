import { SingleDateRange, TabPanel, Tabs, Select } from '@cogoport/components';
import { useState } from 'react';

import { USER_OPTIONS } from '../../constants';

import NetworkList from './NetworkList';
import PerformanceStats from './PerformaceStats';
import styles from './styles.module.css';
import UserList from './UsersList';

function ReferralAnalytics() {
	const [filterOptions, setFilterOptioins] = useState({
		userType   : '',
		selectDate : '',
	});

	const [performanceType, setPerformanceType] = useState('user_performance');

	return (
		<div className={styles.container}>
			<div className={styles.header_div}>
				<div className={styles.title}>Referral- Analytics</div>
				<div className={styles.right_div}>
					<Select
						value={filterOptions?.userType}
						onChange={(val) => setFilterOptioins((prev) => ({ ...prev, userType: val }))}
						placeholder="Select users here"
						options={USER_OPTIONS}
						size="md"
						isClearable
						style={{ width: '250px' }}
					/>
					<SingleDateRange
						placeholder="Enter Date"
						dateFormat="MM/dd/yyyy"
						name="date"
						onChange={(val) => setFilterOptioins((prev) => ({ ...prev, selectDate: val }))}
						value={filterOptions?.selectDate}
					/>
				</div>
			</div>
			<div className={styles.stats_div}>
				<Tabs
					activeTab={performanceType}
					themeType="primary"
					onChange={setPerformanceType}
				>
					<TabPanel name="user_performance" title="User Performance">
						<div className={styles.label}>Users that are</div>
						<PerformanceStats />
					</TabPanel>

					<TabPanel name="business_performance" title="Business Performance">
						<div className={styles.label}>Business that are</div>
						<PerformanceStats />
					</TabPanel>
				</Tabs>
			</div>

			<div className={styles.list_div}>
				<NetworkList />
				<UserList />
			</div>
		</div>
	);
}
export default ReferralAnalytics;
