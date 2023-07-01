import useGetDashboard from '../../../hooks/useGetDashboard';

import FeedbackGraph from './FeedbackGraph';
import OverallStats from './OverallStats';
import styles from './styles.module.css';
import Widget from './Widget';

function Dashboard({ date }) {
	const { data, loading } = useGetDashboard({ date });

	const {
		CustomerSatisfactionStats: customerSatisfactionStats = {},
		TicketCount: ticketCount = {},
		TopCategory: topCategory = [],
		TopCustomer: topCustomer = [],
		TopAgents: topAgents = [],
	} = data || {};

	return (
		<div className={styles.container}>
			<OverallStats
				data={data}
				ticketCount={ticketCount}
			/>
			<div className={styles.body}>
				<div className={styles.agents}>
					<Widget
						label="Top Agents"
						subLabel="Performance Rating"
						data={topAgents}
						type="Performance"
						loading={loading}
					/>
					<FeedbackGraph customerSatisfactionStats={customerSatisfactionStats} loading />
				</div>
				<div className={styles.category}>
					<Widget
						label="Users (based on issues)"
						data={topCustomer}
						type="Users"
						loading={loading}
						isMargin
					/>
					<Widget label="Top Categories" data={topCategory} type="Categories" loading={loading} />
				</div>
			</div>
		</div>
	);
}

export default Dashboard;
