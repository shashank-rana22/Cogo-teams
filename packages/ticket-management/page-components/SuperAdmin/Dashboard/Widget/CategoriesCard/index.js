import { isEmpty } from '@cogoport/utils';

import EmptyTicket from '../../../../../common/EmptyTicket';
import UserCardLoader from '../../../../../common/UserCardLoader';

import styles from './styles.module.css';

function CategoriesCard({ data = [], loading = false }) {
	if (loading) return <UserCardLoader />;

	if (isEmpty(data)) return <EmptyTicket emptyText="No Categories Found" />;

	return (
		<div className={styles.list}>
			{(data || []).map(({ TopTicketType, Type }) => (
				<div className={styles.card} key={Type}>
					<div className={styles.type}>{Type}</div>
					<div className={styles.count}>{TopTicketType}</div>
				</div>
			))}
		</div>
	);
}

export default CategoriesCard;
