import styles from './styles.module.css';

function Widget({ label = 'Top Users', subLabel = 'No of issues', data }) {
	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<div className={styles.title}>{label}</div>
				<div className={styles.title}>{subLabel}</div>
			</div>
			<div className={styles.list}>
				{(data || []).map(({ agent_name, org_name, count }) => (
					<div className={styles.card} key={agent_name}>
						<div className={styles.agent_details}>
							<div className={styles.agent_name}>{agent_name}</div>
							<div className={styles.agent_org}>{org_name}</div>
						</div>
						<div className={styles.count}>{count}</div>
					</div>
				))}
			</div>

		</div>

	);
}

export default Widget;
