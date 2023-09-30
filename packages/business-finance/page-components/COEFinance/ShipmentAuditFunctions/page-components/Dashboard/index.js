import { useRouter } from '@cogoport/next';

import Header from './Header';
import styles from './styles.module.css';

function Dashboard() {
	const router = useRouter();
	const { jobId } = router.query;
	return (
		<div className={styles.container}>
			<Header jobId={jobId} />
		</div>
	);
}

export default Dashboard;
