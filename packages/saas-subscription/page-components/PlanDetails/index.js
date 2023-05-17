import Header from './Header';
import Pricing from './Pricing';
import styles from './styles.module.css';

function PlanDetails() {
	return (
		<div className={styles.container}>
			<h2>Select Plan</h2>
			<div className={styles.cell}>
				<Header />
			</div>
			<div className={styles.cell}>
				<Pricing />
			</div>
		</div>
	);
}

export default PlanDetails;
