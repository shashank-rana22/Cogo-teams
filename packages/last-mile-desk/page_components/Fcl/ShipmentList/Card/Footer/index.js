import styles from './styles.module.css';

function Footer() {
	return (
		<div className={styles.container}>
			<div className={styles.details}>
				<div>Cargo Readiness date: </div>

				<div>Exp. Vessel departure: </div>

				<div>KAM: </div>

				<div>SO1: </div>
			</div>

			<div className={styles.deadline}>
				<div>Deadline: </div>
			</div>
		</div>
	);
}

export default Footer;
