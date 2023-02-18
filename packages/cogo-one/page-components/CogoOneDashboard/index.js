import { useState } from 'react';

import Calender from './Calender';
import ChatStatistics from './ChatStatistics';
import Header from './Header';
import Intelligence from './Intelligence';
import IntentServed from './IntentServed';
import LineChart from './LineChart';
import Statisfaction from './Statisfaction';
import Statistics from './Statistics';
import styles from './styles.module.css';
import TimeSpent from './TimeSpent';

function CogoOneDashboard() {
	const [activeTab, setActiveTab] = useState('day');

	return (
		<div className={styles.prime_container}>
			<Header activeTab={activeTab} setActiveTab={setActiveTab} />
			<div className={styles.sub_container}>
				<div className={styles.left_sub_container}>
					<Calender />
					<LineChart />
					<div className={styles.statistics}>
						<Statistics />
					</div>

				</div>
				<div className={styles.right_sub_container}>
					<TimeSpent />
					<Intelligence />
					<div className={styles.satisfaction_intent_served_box}>
						<Statisfaction />
						<IntentServed />

					</div>
					<div className={styles.two_characterisctics_container}>
						<ChatStatistics />
					</div>

				</div>
			</div>
		</div>
	);
}
export default CogoOneDashboard;
