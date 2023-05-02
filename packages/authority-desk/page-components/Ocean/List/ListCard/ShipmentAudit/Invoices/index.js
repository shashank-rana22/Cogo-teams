import { Tabs, TabPanel } from '@cogoport/components';
import React, { useState } from 'react';

import PurchaseInvoice from './PurchaseInvoice';
import SalesInvoice from './SalesInvoice';
import styles from './styles.module.css';

function Invoices() {
	const [invoiceTab, setInvoiceTab] = useState('sales_invoices');

	return (
		<div className={styles.container}>
			<div>
				{' '}
				<Tabs
					activeTab={invoiceTab}
					themeType="secondary"
					onChange={setInvoiceTab}
					className={styles.tab_panel}
				>
					<TabPanel
						name="purchase_invoices"
						title="Purchase Invoices"
					>
						<PurchaseInvoice />
					</TabPanel>

					<TabPanel
						name="sales_invoices"
						title="Sales Invoices"
					>
						<SalesInvoice />
					</TabPanel>
				</Tabs>

			</div>
		</div>
	);
}

export default Invoices;
