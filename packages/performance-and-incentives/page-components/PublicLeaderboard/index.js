import Body from './components/Body';
import Header from './components/Header';
import styles from './styles.module.css';

function PublicDashboard() {
	return (
		<div className={styles.container}>
			<Header />

			<Body />
		</div>
	);
}

export default PublicDashboard;
