import Charts from './Charts';
import Header from './Header';
import styles from './styles.module.css';

function Main() {
	return (
		<div className={styles.container}>
			<Header />
			<Charts />
		</div>
	);
}

export default Main;
