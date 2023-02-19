import { useState } from 'react';

import Calender from './Calender';
import ChatStatistics from './ChatStatistics';
import Header from './Header';
// import Intelliagence from './Intelliagence';
// import IntentServed from './IntentServed';
// import LineChart from './LineChart';
// import Statisfaction from './Statisfaction';
// import Statistics from './Statistics';
import styles from './styles.module.css';
import TimeSpent from './TimeSpent';

function CogoOneDashboard() {
	const [activeTab, setActiveTab] = useState('day');

	return (
		<>
			<Header activeTab={activeTab} setActiveTab={setActiveTab} />
			<div className={styles.sub_container}>
				<div className={styles.left_sub_container}>
					<Calender />
					{/* <LineChart />
					<Statistics /> */}
				</div>
				<div className={styles.right_sub_container}>
					<TimeSpent />
					{/* <Intelliagence />
					<Statisfaction />
					<IntentServed />
					<ChatStatistics /> */}
				</div>
			</div>
		</>
	);
}
export default CogoOneDashboard;
