import { isEmpty } from '@cogoport/utils';

import EmptyTicket from '../../../../../common/EmptyTicket';
import UserCardLoader from '../../../../../common/UserCardLoader';

import styles from './styles.module.css';

function UserCard({ data, loading }) {
	if (loading) return <UserCardLoader />;

	if (isEmpty(data)) return <EmptyTicket emptyText="No User Data" />;

	return (
		<div className={styles.list}>
			{(data || []).map(({ UserId, Name, OrganizationName, Tickets }) => (
				<div className={styles.card} key={UserId}>
					<div className={styles.agent_details}>
						<div className={styles.agent_name}>{Name}</div>
						<div className={styles.agent_org}>{OrganizationName}</div>
					</div>
					<div className={styles.count}>{Tickets}</div>
				</div>
			))}
		</div>
	);
}

function CategoriesCard({ data, loading }) {
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

function Widget({ label = 'Top Users', subLabel = 'No of issues', data, type, loading }) {
	const cardComponentMapping = {
		Users       : <UserCard data={data} loading={loading} />,
		Categories  : <CategoriesCard data={data} loading={loading} />,
		Performance : <PerformanceCard data={data} loading={loading} />,
	};

	const CardComponent = cardComponentMapping[type];

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<div className={styles.title}>{label}</div>
				<div className={styles.title}>{subLabel}</div>
			</div>
			{CardComponent || null}
		</div>

	);
}

export default Widget;
