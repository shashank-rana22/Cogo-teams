import { useRouter } from '@cogoport/next';
import React from 'react';

import styles from './styles.module.css';

function ViewInvoice({ item = {}, field = {} }) {
	const { isIncome } = field || {};
	const router = useRouter();
	const handleChange = (itemData) => {
		const {
			billId, billNumber, organizationId, jobNumber, status, invoicePdfUrl, proformaPdfUrl, jobType,
		} = itemData || {};
		if (isIncome) {
			window.open(invoicePdfUrl || proformaPdfUrl, '_blank');
		} else {
			router.push(
				`/business-finance/audit-function/${router.query.active_tab}
			/view-invoices?billId=${billId}&billNumber=${billNumber}
			&orgId=${organizationId}&jobNumber=${jobNumber}&isShipment=${true}&status=${status}&jobType=${jobType}`,
			);
		}
	};
	return (
		<div className={styles.button}>
			{item?.urgencyTag && (
				<div className={styles.ribbons}>
					<div className={styles.ribbon}>Urgent</div>
				</div>
			)}
			<div
				className={styles.link}
				onClick={() => {
					handleChange(item);
				}}
				role="presentation"
			>
				View Invoices
			</div>
		</div>
	);
}

export default ViewInvoice;
