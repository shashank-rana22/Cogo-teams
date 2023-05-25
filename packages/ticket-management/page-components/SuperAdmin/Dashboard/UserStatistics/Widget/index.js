import styles from './styles.module.css';

function Widget({ label = 'Top Users', subLabel = 'No of issues', data }) {
	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<div className={styles.title}>{label}</div>
				<div className={styles.title}>{subLabel}</div>
			</div>
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

		</div>

	);
}

export default Widget;
