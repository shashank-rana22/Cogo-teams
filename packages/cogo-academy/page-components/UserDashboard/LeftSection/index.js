import LastTestResults from './LastTestResults';
import Overview from './Overview';
import styles from './styles.module.css';

function LeftSection() {
	return (
		<div className={styles.container}>
			<LastTestResults />
			<Overview />
		</div>
	);
}

export default LeftSection;
