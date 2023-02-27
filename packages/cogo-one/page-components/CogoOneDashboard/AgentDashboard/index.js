import { useSelector } from '@cogoport/store';
import { useState } from 'react';

import Calender from '../../../common/Calendar';
import ChatStatistics from '../../../common/ChatStatistics';
import Header from '../../../common/Header';
import LineChart from '../../../common/LineChart';
import Statistics from '../../../common/Statistics';

import Intelligence from './Intelligence';
import IntentServed from './IntentServed';
import Statisfaction from './Statisfaction';
import styles from './styles.module.css';
import TimeSpent from './TimeSpent';

function AgentDashboard(props) {
	const { timeline, setTimeline, listData } = props || {};
	const [activeTab, setActiveTab] = useState('day');
	const { customer_satisfaction = {}, intents_served = {} } = listData || {};
	// const { user } = useSelector(({ profile }) => profile);
	const {
		user_data,
	} = useSelector(({ profile }) => ({
		user_data: profile || {},
	}));

	console.log('user_data', user_data);

	return (
		<div className={styles.prime_container}>
			<Header
				activeTab={activeTab}
				setActiveTab={setActiveTab}
				timeline={timeline}
				setTimeline={setTimeline}
			/>
			<div className={styles.sub_container}>
				<div className={styles.left_sub_container}>
					<Calender props={props} />
					<LineChart />
					<div className={styles.statistics}>
						<Statistics />
					</div>

				</div>
				<div className={styles.right_sub_container}>
					<TimeSpent />
					<Intelligence />

					<div className={styles.satisfaction_intent_served_box}>
						<Statisfaction customer_satisfaction={customer_satisfaction} />
						<IntentServed intentsServed={intents_served} />

					</div>
					<div className={styles.two_characterisctics_container}>
						<ChatStatistics isAdminView={false} />
					</div>

				</div>
			</div>
		</div>
	);
}
export default AgentDashboard;
