import useGetDashboard from '../../../hooks/useGetDashboard';

import Graph from './Graph';
import OverallStats from './OverallStats';
import styles from './styles.module.css';
import UserStatistics from './UserStatistics';

function Dashboard() {
	const { data } = useGetDashboard();

	const {
		CustomerSatisfactionStats, TicketCount, TopCategory, TopCustomer,
	} = data || {};

	return (
		<div className={styles.container}>
			<OverallStats
				ticketCount={TicketCount}
				data={data}
			/>
			<UserStatistics topCustomer={TopCustomer} topCategory={TopCategory} />
			<Graph customerSatisfactionStats={CustomerSatisfactionStats} />
		</div>
	);
}

export default Dashboard;
