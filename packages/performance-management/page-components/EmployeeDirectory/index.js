import Organization from './Organization';
import styles from './styles.module.css';

function EmployeeDirectory() {
	return (
		<div className={styles.container}>
			<div className={styles.header}>Employee Directory</div>
			<div className={styles.organization_container}>
				<Organization />
			</div>
		</div>
	);
}

export default EmployeeDirectory;
