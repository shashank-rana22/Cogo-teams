import { useRouter } from '@cogoport/next';
import React from 'react';

import styles from './styles.module.css';

interface ItemTypes {
	urgencyTag?: string;
}

interface PropsType {
	item: ItemTypes;
}

function ViewInvoice({ item }: PropsType) {
	const router = useRouter();
	const handleChange = (itemData: any) => {
		router.push(
			`/business-finance/coe-finance/${router.query.active_tab}
			/view-invoices?billId=${itemData?.billId}&billNumber=${itemData?.billNumber}
			&orgId=${itemData?.organizationId}&jobNumber=${itemData?.jobNumber}`,
		);
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
