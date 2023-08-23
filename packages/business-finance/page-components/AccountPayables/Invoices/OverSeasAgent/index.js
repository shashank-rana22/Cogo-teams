import { Breadcrumb, Button, Stepper } from '@cogoport/components';
import { Link } from '@cogoport/next';
import React, { useState, useEffect } from 'react';

import useGetInvoiceSelection from '../hooks/useInvoiceSelection';

import InvoiceBLCheck from './InvoiceBLCheck';
import InvoiceSelection from './InvoiceSelection';
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
	const [showHeader, setShowHeader] = useState(true);
	const INITIAL_ACTIVE = 'invoice_selection';
	const [active, setActive] = useState(INITIAL_ACTIVE);
	const [bLData, setBLData] = useState([{}]);
	const [showPayableAmount, setShowPayableAmount] = useState();
	const [showSaveAsDraft, setShowSaveAsDraft] = useState(false);
	// const { organizationId = '' } = urlQuery || {};
	const ORGANIZATION_ID = 'b8099de7-8bae-4cf0-9db2-3a75171b11de';
	const { goBack, resetPage, currency } = useGetInvoiceSelection({});
	const { payrunState = '' } = bLData || {};

	useEffect(() => {
		if (payrunState === 'INVOICE_BL_CHECK') {
			setActive('invoice_bl_check');
		} else if (payrunState === 'UPLOAD_DOCUMENTS') {
			setActive('upload_documents');
		} else if (payrunState === 'FINAL_CONFIRMATION') {
			setActive('final_confirmation');
		} else if (payrunState === 'MERGE_DOCUMENTS') {
			setActive('merge_documents');
		} else setActive('invoice_selection');
	}, [payrunState]);

	function RenderData() {
		// if (active === 'Merge Documents') {
		// 	return <MergeDocuments setActive={setActive} />;
		// }
		if (active === 'invoice_bl_check') {
			return <InvoiceBLCheck setActive={setActive} bLData={bLData} />;
		}
		// if (active === 'Final Confirmation') {
		// 	return (
		// 		<FinalConfirmation
		// 			setActive={setActive}
		// 			setShowSaveAsDraft={setShowSaveAsDraft}
		// 		/>
		// 	);
		// }
		// if (active === 'Upload Documents') {
		// 	return <UploadDocument setActive={setActive} />;
		// }
		return (
			<InvoiceSelection
				setActive={setActive}
				active={active}
				setBLData={setBLData}
				setShowHeader={setShowHeader}
				showHeader={showHeader}
				setShowPayableAmount={setShowPayableAmount}
				setShowSaveAsDraft={setShowSaveAsDraft}
			/>
		);
	}

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

				<Button
					size="sm"
					themeType="accent"
					onClick={() => {
						goBack();
						resetPage();
					}}
					disabled={showSaveAsDraft}
				>
					Save as Draft

				</Button>
			</div>

			{showHeader && (
				<>
					<PayabledDetails
						organizationId={ORGANIZATION_ID}
						showPayableAmount={showPayableAmount}
						currency={currency}
					/>

					<Stepper active={active} setActive={setActive} items={STEPS_MAPPING} arrowed />
				</>
			)}

			{RenderData()}

		</div>
	);
}

export default OverSeasAgent;
