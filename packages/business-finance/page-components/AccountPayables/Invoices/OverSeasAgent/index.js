import { Breadcrumb, Button, Stepper } from '@cogoport/components';
import { Link } from '@cogoport/next';
import React, { useState } from 'react';

import Footer from './Footer';
import InvoiceSelction from './InvoiceSelection';
import PayabledDetails from './PayableDetails';
import styles from './styles.module.css';

const STEPS_MAPPING = [
	{ title: 'Invoice selection', key: 'invoice_selection' },
	{ title: 'Invoice - BL check', key: 'invoice_bl_check' },
	{ title: 'Merge Documents', key: 'merge_documents' },
	{ title: 'Upload Documents', key: 'upload_documents' },
	{ title: 'Final Confirmation', key: 'final_confirmation' },
];

function OverSeasAgent() {
	const INITIAL_ACTIVE = 'invoice_selection';
	const [active, setActive] = useState(INITIAL_ACTIVE);

	return (
		<div className={styles.container}>
			<div className={styles.breadcrumb}>
				<Breadcrumb>
					<Breadcrumb.Item label={(
						<Link href="/business-finance/account-payables/invoices">
							Invoices
						</Link>
					)}
					/>
					<Breadcrumb.Item label="PayRun Creation" />
					<Breadcrumb.Item label="Select Invoices(Overseas Agent)" />
				</Breadcrumb>

				<Button size="sm" themeType="accent">Save as Draft</Button>
			</div>

			<PayabledDetails />

			<Stepper active={active} setActive={setActive} items={STEPS_MAPPING} arrowed />

			<InvoiceSelction />

			<Footer />
		</div>
	);
}

export default OverSeasAgent;
