import { useTranslation } from 'next-i18next';

import useGetDashboard from '../../../hooks/useGetDashboard';

import FeedbackGraph from './FeedbackGraph';
import OverallStats from './OverallStats';
import styles from './styles.module.css';
import Widget from './Widget';

function Dashboard({ date = {} }) {
	const { t } = useTranslation(['myTickets']);

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
						label={t('myTickets:top_agents')}
						subLabel={t('myTickets:performance_rating')}
						data={topAgents}
						type="Performance"
						loading={loading}
					/>
					<FeedbackGraph customerSatisfactionStats={customerSatisfactionStats} loading />
				</div>
				<div className={styles.category}>
					<Widget
						label={t('myTickets:users_based_on_issues')}
						data={topCustomer}
						type="Users"
						loading={loading}
						isMargin
					/>
					<Widget
						label={t('myTickets:top_categories')}
						data={topCategory}
						type="Categories"
						loading={loading}
					/>
				</div>
			</div>
		</div>
	);
}

export default Dashboard;
