import { isEmpty } from '@cogoport/utils';

import EmptyTicket from '../../../../../common/EmptyTicket';
import UserCardLoader from '../../../../../common/UserCardLoader';

import styles from './styles.module.css';

function UserCard({ data = [], loading = false }) {
	if (loading) return <UserCardLoader />;

	if (isEmpty(data)) return <EmptyTicket emptyText="No User Data" />;

	return (
		<div className={styles.list}>
			{(data || []).map((item) => {
				const {
					UserId: userId, Name: name = '',
					OrganizationName: organizationName = '', Tickets: tickets = '',
				} = item || {};

				return (
					<div className={styles.card} key={userId}>
						<div>
							<div className={styles.agent_name}>{name}</div>
							<div className={styles.agent_org}>{organizationName}</div>
						</div>
						<div className={styles.count}>{tickets}</div>
					</div>
				);
			})}
		</div>
	);
}

export default UserCard;
