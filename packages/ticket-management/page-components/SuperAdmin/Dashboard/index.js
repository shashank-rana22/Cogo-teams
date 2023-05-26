import useGetDashboard from '../../../hooks/useGetDashboard';

import FeedbackGraph from './FeedbackGraph';
import OverallStats from './OverallStats';
import styles from './styles.module.css';
import UserStatistics from './UserStatistics';
import Widget from './UserStatistics/Widget';

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
			<div className={styles.body}>
				<div className={styles.agents}>
					<UserStatistics
						topCustomer={TopCustomer}
						topCategory={TopCategory}
						topAgents={TopAgents}
						loading={loading}
					/>

					<FeedbackGraph customerSatisfactionStats={CustomerSatisfactionStats} loading />
				</div>
				<div className={styles.category}>
					<Widget label="Users (based on issues)" data={TopCustomer} type="Users" loading={loading} />
					<Widget label="Top Categories" data={TopCategory} type="Categories" loading={loading} />

				</div>
			</div>
		</div>
	);
}

export default Dashboard;
