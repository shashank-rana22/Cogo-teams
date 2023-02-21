// import { useSelector } from '@cogoport/store';
import { useState } from 'react';

// import AgentActivity from './AgentActivity';
// import Calender from './Calender';
import ChatStatistics from './ChatStatistics';
import Header from './Header';
import Intelligence from './Intelligence';
import IntentServed from './IntentServed';
import LineChart from './LineChart';
// import PerformanceTab from './PerformanceTabs';
// import RedFlags from './RedFlags';
import Statisfaction from './Statisfaction';
import Statistics from './Statistics';
import styles from './styles.module.css';
import TimeSpent from './TimeSpent';

function CogoOneDashboard() {
	const [activeTab, setActiveTab] = useState('day');
	// const { user } = useSelector(({ profile }) => profile);

	return (
		<div className={styles.prime_container}>
			<Header activeTab={activeTab} setActiveTab={setActiveTab} />
			<div className={styles.sub_container}>
				<div className={styles.left_sub_container}>
					{/* <Calender /> */}
					<LineChart />
					{/* <AgentActivity /> */}
					<div className={styles.statistics}>
						<Statistics />
					</div>

				</div>
				<div className={styles.right_sub_container}>
					<TimeSpent />
					<Intelligence />
					{/* <RedFlags />
					<PerformanceTab /> */}

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
