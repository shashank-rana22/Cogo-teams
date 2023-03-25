import { useRouter } from '@cogoport/next';

import styles from './styles.module.css';

function ResponseView() {
	const { query } = useRouter();
	const { type, action } = query || {};

	return (
		<div>
			<div className={styles.container}>
				{type === 'configuration' && action === 'approved' && <h1>Your Record is approved</h1>}
				{type === 'configuration' && action === 'rejected' && <h1>Your Record is rejected</h1>}
				{type === 'expense' && action === 'approved' && <h1>Your Expense is approved</h1>}
				{type === 'expense' && action === 'rejected' && <h1>Your Expense is rejected</h1>}

				{(!type || !action) && <h1>Nothing to show</h1>}
			</div>
			<div>
				{action === 'approved' && (
					<div className={styles.success}>
						<div>
							<img
								src="https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/success_icon_2.svg"
								alt="success"
							/>

						</div>
					</div>
				)}
				{action === 'rejected' && (
					<div className={styles.reject}>
						<div>
							<img
								src="https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/warning.svg"
								alt="success"
							/>

						</div>
					</div>
				)}
			</div>
		</div>
	);
}

export default ResponseView;
