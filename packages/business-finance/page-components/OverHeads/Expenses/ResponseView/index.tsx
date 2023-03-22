import { useRouter } from '@cogoport/next';

import { styles } from './styles.module.css';

function ResponseView() {
	const { query } = useRouter();
	const { type, status, id } = query || {};

	return (
		<div style={{ display: 'flex', justifyContent: 'center' }}>
			{type === 'configuration' && status === 'approved' && <h1>Your Record is approved</h1>}
			{type === 'configuration' && status === 'rejected' && <h1>Your Record is rejected</h1>}
			{type === 'expense' && status === 'approved' && <h1>Your Expense is approved</h1>}
			{type === 'expense' && status === 'rejected' && <h1>Your Expense is rejected</h1>}
			{(!type || !status) && <h1>Nothing to show</h1>}
		</div>
	);
}

export default ResponseView;
