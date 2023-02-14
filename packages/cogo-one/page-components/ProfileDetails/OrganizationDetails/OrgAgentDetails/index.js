import styles from './styles.module.css';

function OrgAgentDetails() {
	return (
		<>
			<div className={styles.container}>
				<div className={styles.content}>
					<div className={styles.agent_type}>Sales agent : </div>
					<div className={styles.name}>Cogoport Care</div>
				</div>
				<div className={styles.content}>
					<div className={styles.type}>Email : </div>
					<div className={styles.name}>support@cogoport.com</div>
				</div>
				<div className={styles.content}>
					<div className={styles.type}>Mobile No : </div>
					<div className={styles.name}>+91 8735704384</div>
				</div>
			</div>
			<div className={styles.container}>
				<div className={styles.content}>
					<div className={styles.agent_type}>Collection agent : </div>
					<div className={styles.name}>Cogoport Care</div>
				</div>
				<div className={styles.content}>
					<div className={styles.type}>Email : </div>
					<div className={styles.name}>support@cogoport.com</div>
				</div>
				<div className={styles.content}>
					<div className={styles.type}>Mobile No : </div>
					<div className={styles.name}>+91 8735704384</div>
				</div>
			</div>
		</>
	);
}
export default OrgAgentDetails;
