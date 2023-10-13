import { dynamic } from '@cogoport/next';

import styles from './styles.module.css';

const Header = dynamic(() => import('./Header'), { ssr: false });
const InfoContainer = dynamic(() => import('./InfoContainer'), { ssr: false });
const MainContainer = dynamic(() => import('./MainContainer'), { ssr: false });

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
