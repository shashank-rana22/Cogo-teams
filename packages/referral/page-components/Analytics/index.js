import { DateRangepicker, TabPanel, Tabs } from '@cogoport/components';
import { useState, useEffect } from 'react';

import BusinessPerformance from './Business';
import styles from './styles.module.css';
import UserPerformance from './Users';

function Analytics() {
	const [selectedDate, setSelectedDate] = useState({});

	const [performanceType, setPerformanceType] = useState('user_performance');

	useEffect(() => {
		setSelectedDate({});
	}, [performanceType]);

	return (
		<div className={styles.container}>
			<div className={styles.header_div}>
				<div className={styles.title}>Referral- Analytics</div>
				<DateRangepicker
					name="date"
					onChange={(val) => setSelectedDate(val)}
					value={selectedDate}
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
						<UserPerformance
							selectedDate={selectedDate}
							setSelectedDate={setSelectedDate}
						/>
					</TabPanel>

					<TabPanel name="business_performance" title="Business Performance">
						<BusinessPerformance
							selectedDate={selectedDate}
							setSelectedDate={setSelectedDate}
						/>
					</TabPanel>
				</Tabs>
			</div>

		</div>
	);
}
export default Analytics;
