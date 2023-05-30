import { DateRangepicker, TabPanel, Tabs } from '@cogoport/components';
import { useState } from 'react';

import BusinessPerformance from './Business';
import styles from './styles.module.css';
import UserPerformance from './Users';

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
				<DateRangepicker
					name="date"
					onChange={(val) => setFilterOptioins((prev) => ({ ...prev, selectDate: val }))}
					value={filterOptions?.selectDate}
					isPreviousDaysAllowed
				/>
			</div>
			<div className={styles.stats_div}>
				<Tabs
					activeTab={performanceType}
					themeType="primary"
					onChange={setPerformanceType}
				>
					<TabPanel name="user_performance" title="User Performance">
						<div className={styles.label}>Users that are</div>
						<UserPerformance />
					</TabPanel>

					<TabPanel name="business_performance" title="Business Performance">
						<BusinessPerformance />
					</TabPanel>
				</Tabs>
			</div>

		</div>
	);
}
export default ReferralAnalytics;
