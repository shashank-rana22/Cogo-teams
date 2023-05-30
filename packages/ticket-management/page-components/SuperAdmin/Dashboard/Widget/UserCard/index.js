import { isEmpty } from '@cogoport/utils';

import EmptyTicket from '../../../../../common/EmptyTicket';
import UserCardLoader from '../../../../../common/UserCardLoader';

import styles from './styles.module.css';

function UserCard({ data = [], loading = false }) {
	if (loading) return <UserCardLoader />;

	if (isEmpty(data)) return <EmptyTicket emptyText="No User Data" />;

	return (
		<div className={styles.list}>
			{(data || []).map(({ UserId, Name, OrganizationName, Tickets }) => (
				<div className={styles.card} key={UserId}>
					<div>
						<div className={styles.agent_name}>{Name}</div>
						<div className={styles.agent_org}>{OrganizationName}</div>
					</div>
					<div className={styles.count}>{Tickets}</div>
				</div>
			))}
		</div>
	);
}

export default UserCard;
