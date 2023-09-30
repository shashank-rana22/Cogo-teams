import { useRouter } from '@cogoport/next';

import Header from '../Dashboard/Header';

import styles from './styles.module.css';

function Dashboard() {
	const router = useRouter();
	const { jobId } = router.query;
	return (
		<div className={styles.container}>
			<Header activeTab="financial_close" jobId={jobId} />
		</div>
	);
}

export default Dashboard;
