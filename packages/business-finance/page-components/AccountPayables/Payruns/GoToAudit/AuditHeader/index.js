import NavBar from './NavBar';
import styles from './styles.module.css';

function AuditHeader() {
	return (
		<div>
			<div>
				<div className={styles.heading}>Account Payables</div>
			</div>
			<NavBar />
		</div>

	);
}

export default AuditHeader;
