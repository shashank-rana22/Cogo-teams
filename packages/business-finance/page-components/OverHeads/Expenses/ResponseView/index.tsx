import { useRouter } from '@cogoport/next';

import styles from './styles.module.css';

function ResponseView() {
	const { query } = useRouter();
	const { type, action, id } = query || {};

	return (
		<div className={styles.container}>
			{type === 'configuration' && action === 'approved' && <h1>Your Record is approved</h1>}
			{type === 'configuration' && action === 'rejected' && <h1>Your Record is rejected</h1>}
			{type === 'expense' && action === 'approved' && <h1>Your Expense is approved</h1>}
			{type === 'expense' && action === 'rejected' && <h1>Your Expense is rejected</h1>}
			{(!type || !action) && <h1>Nothing to show</h1>}
		</div>
	);
}

export default ResponseView;
