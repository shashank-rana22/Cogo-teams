import { DateRangepicker, TabPanel, Tabs } from '@cogoport/components';
import { useState, useEffect } from 'react';

import BusinessPerformance from './Business';
import styles from './styles.module.css';
import UserPerformance from './Users';

const TAP_OPTIONS = [
	{
		name      : 'user_performance',
		title     : 'User Performance',
		label     : 'Users that are',
		component : UserPerformance,
	},
	{
		name      : 'business_performance',
		title     : 'Business Performance',
		label     : '',
		component : BusinessPerformance,
	},
];

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
					{TAP_OPTIONS.map((item) => {
						const { name = '', title = '', label = '', component: Component } = item;
						return (
							<TabPanel name={name} title={title} key={name}>
								{label ? <div className={styles.label}>{label}</div> : null}
								<Component
									selectedDate={selectedDate}
									setSelectedDate={setSelectedDate}
								/>
							</TabPanel>
						);
					})}
				</Tabs>
			</div>

		</div>
	);
}
export default Analytics;
