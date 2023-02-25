import styles from './styles.module.css';

function OrgAgentDetails({ agent }) {
	const { email, mobile_country_code, mobile_number, name } = agent || {};
	return (
		<div className={styles.container}>

			<div className={styles.content}>
				<div className={styles.agent_type}>Name : </div>
				<div className={styles.name}>{name || 'NA'}</div>
			</div>
			<div className={styles.content}>
				<div className={styles.type}>Email : </div>
				<div className={styles.name}>{email || '-'}</div>
			</div>
			<div className={styles.content}>
				<div className={styles.type}>Mobile No : </div>
				<div className={styles.name}>
					{mobile_country_code}
					{' '}
					{' '}
					{mobile_number || '-'}
				</div>
			</div>

		</div>
	);
}
export default OrgAgentDetails;
