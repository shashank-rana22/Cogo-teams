import Charts from './Charts';
import Header from './Header';
import styles from './styles.module.css';

function Main({ activePair }) {
	return (
		<div className={styles.container}>
			<Header activePair={activePair} />
			<Charts />
		</div>
	);
}

export default Main;
