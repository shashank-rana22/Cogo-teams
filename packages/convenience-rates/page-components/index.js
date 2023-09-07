import ConvenienceRate from './ConvenienceRate';
import styles from './styles.module.css';

function ConvenienceRates() {
	return (
		<div className={styles.container}>
			<div className={styles.heading}>
				Convenience Fee Configuration
			</div>
			<ConvenienceRate />
		</div>
	);
}

export default ConvenienceRates;
