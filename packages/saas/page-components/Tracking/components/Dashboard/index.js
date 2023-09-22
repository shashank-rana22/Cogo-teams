import Header from './Header';
import InfoContainer from './InfoContainer';
import MainContainer from './MainContainer';
import styles from './styles.module.css';

function Dashboard() {
	return (
		<div>
			<Header />
			<div className={styles.container}>
				<div className={styles.main_section}>
					<MainContainer />
				</div>
				<div className={styles.info_section}>
					<InfoContainer />
				</div>
			</div>
		</div>
	);
}

export default Dashboard;
