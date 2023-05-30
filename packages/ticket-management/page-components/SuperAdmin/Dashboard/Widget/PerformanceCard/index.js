import { isEmpty } from '@cogoport/utils';

import EmptyTicket from '../../../../../common/EmptyTicket';
import UserCardLoader from '../../../../../common/UserCardLoader';

import styles from './styles.module.css';

function PerformanceCard({ data, loading }) {
	if (loading) return <UserCardLoader />;

	if (isEmpty(data)) return <EmptyTicket emptyText="No Agents Found" />;

	return (
		<div className={styles.list}>
			{(data || []).map(({ AgentName, PerformanceRating }) => (
				<div className={styles.card} key={PerformanceRating}>
					<div className={styles.type}>{AgentName}</div>
					<div className={styles.count}>
						{PerformanceRating.toFixed(2)}
						%
					</div>
				</div>
			))}
		</div>
	);
}

export default PerformanceCard;
