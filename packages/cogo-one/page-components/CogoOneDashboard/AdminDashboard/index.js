import { useSelector } from '@cogoport/store';
import { useState } from 'react';

import Calender from '../../../common/Calendar';
import ChatStatistics from '../../../common/ChatStatistics';
import Header from '../../../common/Header';
import LineChart from '../../../common/LineChart';
import Statistics from '../../../common/Statistics';

import AgentActivity from './AgentActivity';
import PerformanceTab from './PerformanceTabs';
import RedFlags from './RedFlags';
import styles from './styles.module.css';

function AdminDashboard() {
	const [activeTab, setActiveTab] = useState('day');
	// const { user } = useSelector(({ profile }) => profile);
	const {
		user_data,
	} = useSelector(({ profile }) => ({
		user_data: profile || {},
	}));

	console.log('user_data', user_data);

	return (
		<div className={styles.prime_container}>
			<Header activeTab={activeTab} setActiveTab={setActiveTab} />
			<div className={styles.sub_container}>
				<div className={styles.left_sub_container}>
					<Calender />
					<LineChart />
					<AgentActivity />
					<div className={styles.statistics}>
						<Statistics />
					</div>

				</div>
				<div className={styles.right_sub_container}>

					<RedFlags />
					<PerformanceTab />

					<div className={styles.four_characterisctics_container}>
						<ChatStatistics isAdminView />
					</div>

				</div>
			</div>
		</div>
	);
}
export default AdminDashboard;
