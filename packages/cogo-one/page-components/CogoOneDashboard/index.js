// import { useSelector } from '@cogoport/store';
// import { useState } from 'react';

import AdminDashboard from './AdminDashboard';
import AgentDashboard from './AgentDashboard';
import styles from './styles.module.css';

function CogoOneDashboard({ isManagerView = true }) {
	// const [activeTab, setActiveTab] = useState('day');
	// const { user } = useSelector(({ profile }) => profile);
	// const {
	// 	user_data,
	// } = useSelector(({ profile }) => ({
	// 	user_data: profile || {},
	// }));

	return (
		<div className={styles.prime_container}>
			{isManagerView
				? <AdminDashboard isManagerView={isManagerView} />
				: <AgentDashboard isManagerView={isManagerView} />}
		</div>
	);
}
export default CogoOneDashboard;
