import styles from './styles.module.css';

function UserCard({ data }) {
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

function CategoriesCard({ data }) {
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

function Widget({ label = 'Top Users', subLabel = 'No of issues', data, type }) {
	const cardComponentMapping = {
		Users      : <UserCard data={data} />,
		Categories : <CategoriesCard data={data} />,
	};

	const CardComponent = cardComponentMapping[type];

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<div className={styles.title}>{label}</div>
				<div className={styles.title}>{subLabel}</div>
			</div>
			{CardComponent}
		</div>

	);
}

export default Widget;
