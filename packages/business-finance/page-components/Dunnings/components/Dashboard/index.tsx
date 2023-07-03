import styles from './styles.module.css';

function Dashboard() {
	return (
		<div className={styles.container}>
			<img
				style={{ height: '400px' }}
				alt="coming soon"
				src="https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/ic-empty-doc.svg"
			/>
			<div />
			<h1>Coming soon ...</h1>
		</div>
	);
}

export default Dashboard;
