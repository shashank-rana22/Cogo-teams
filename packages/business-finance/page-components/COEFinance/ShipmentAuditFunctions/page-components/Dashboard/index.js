import { useRouter } from '@cogoport/next';

import Header from './Header';
import styles from './styles.module.css';

function Dashboard() {
	const router = useRouter();
	const { job_id } = router.query;
	return (
		<div className={styles.container}>
			<Header activeTab="" jobId={job_id} />
		</div>
	);
}

export default Dashboard;
