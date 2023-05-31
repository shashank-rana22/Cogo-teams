import { isEmpty } from '@cogoport/utils';

import EmptyTicket from '../../../../../common/EmptyTicket';
import UserCardLoader from '../../../../../common/UserCardLoader';

import styles from './styles.module.css';

function PerformanceCard({ data = [], loading = false }) {
	if (loading) return <UserCardLoader />;

	if (isEmpty(data)) return <EmptyTicket emptyText="No Agents Found" />;

	return (
		<div className={styles.list}>
			{(data || []).map((item) => {
				const { AgentName: agentName = '', PerformanceRating: performanceRating = 0 } = item || {};

				return (
					<div className={styles.card} key={performanceRating}>
						<div className={styles.type}>{agentName}</div>
						<div className={styles.count}>
							{performanceRating.toFixed(2)}
							%
						</div>
					</div>
				);
			})}
		</div>
	);
}

export default PerformanceCard;
