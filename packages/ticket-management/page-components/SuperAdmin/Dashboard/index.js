import useGetDashboard from '../../../hooks/useGetDashboard';

import Graph from './Graph';
import OverallStats from './OverallStats';
import styles from './styles.module.css';
import UserStatistics from './UserStatistics';

function Dashboard() {
	const { data, loading } = useGetDashboard();

	const {
		CustomerSatisfactionStats, TicketCount, TopCategory,
		TopCustomer, TopAgents,
	} = data || {};

	return (
		<div className={styles.container}>
			<OverallStats
				ticketCount={TicketCount}
				data={data}
			/>
			<UserStatistics
				topCustomer={TopCustomer}
				topCategory={TopCategory}
				topAgents={TopAgents}
				loading={loading}
			/>
			<Graph customerSatisfactionStats={CustomerSatisfactionStats} loading={loading} />
		</div>
	);
}

export default Dashboard;
