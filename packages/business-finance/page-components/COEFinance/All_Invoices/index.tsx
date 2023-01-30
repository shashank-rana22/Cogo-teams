import { useRouter } from '@cogoport/next';
import React, { useEffect, useState } from 'react';

import PurchaseInvoice from './PurchaseInvoiceView/index';
import ShipmentIdView from './ShipmentIdView/index';
import styles from './styles.module.css';

function AllInvoices() {
	const [filters, setFilters] = useState({});
	const { push, query } = useRouter();
	const [subActiveTab, setSubActiveTab] = useState<string>(
		query.view || 'purchase-view',
	);

	const isPurchase = subActiveTab === 'purchase-view';

	useEffect(() => {
		push(
			'/business-finance/coe-finance/[active_tab]/[view]',
			`/business-finance/coe-finance/all_invoices/${subActiveTab}` as never as null,
		);
	}, [subActiveTab]);

	return (
		<div>
			<div className={styles.container}>
				<div className={styles.flex}>
					<div
						onClick={() => {
            	setSubActiveTab('purchase-view');
						}}
						role="presentation"
					>
						<div
							className={
                isPurchase ? styles.sub_container_click : styles.sub_container
              }
						>
							PURCHASE INVOICE VIEW
						</div>
					</div>
					<div
						onClick={() => {
            	setSubActiveTab('shipment-view');
						}}
						role="presentation"
					>
						<div
							className={
                !isPurchase ? styles.sub_container_click : styles.sub_container
              }
						>
							SHIPMENT ID VIEW
						</div>
					</div>
				</div>
			</div>
			{isPurchase && (
				<PurchaseInvoice
					filters={filters}
					setFilters={setFilters}
					subActiveTab={subActiveTab}
				/>
			)}
			{!isPurchase && <ShipmentIdView />}
		</div>
	);
}
export default AllInvoices;
