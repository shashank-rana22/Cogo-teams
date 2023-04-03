import { useRouter } from '@cogoport/next';
import React from 'react';

import styles from './styles.module.css';

interface ItemTypes {
	urgencyTag?: string;
	billId?:string;
	billNumber?:string;
	organizationId?:string;
	jobNumber?: string;
	status?: string;

}

interface PropsType {
	item: ItemTypes;

}

function ViewInvoice({ item }: PropsType) {
	const router = useRouter();
	const handleChange = (itemData:ItemTypes) => {
		const { billId, billNumber, organizationId, jobNumber, status } = itemData || {};
		router.push(
			`/business-finance/coe-finance/${router.query.active_tab}
			/view-invoices?billId=${billId}&billNumber=${billNumber}
			&orgId=${organizationId}&jobNumber=${jobNumber}&isShipment=${true}&status=${status}`,
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
