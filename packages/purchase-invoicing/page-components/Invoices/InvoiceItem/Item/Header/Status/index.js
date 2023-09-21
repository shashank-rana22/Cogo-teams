import { startCase } from '@cogoport/utils';

import Actions from './Actions';
import styles from './styles.module.css';

function Status({
	invoice = {},
	refetchAferApiCall = () => {},
}) {
	return (
		<div className={styles.status_container_outer}>
			<div className={styles.invoice_status}>
				{startCase(invoice?.status || '')}
			</div>

			{!invoice?.is_revoked && invoice?.status !== 'finance_rejected' && (
				<Actions
					invoice={invoice}
					refetch={refetchAferApiCall}
				/>
			)}
		</div>
	);
}
export default Status;
