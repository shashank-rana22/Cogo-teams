import styles from './styles.module.css';

function EmploymentHistory({ profileData }) {
	const { detail } = profileData || {};
	const { employee_experience_details = [] } = detail || {};

	return (
		<div className={styles.container}>
			Employment History
		</div>
	);
}

export default EmploymentHistory;
