import { Breadcrumb, Button, Stepper } from '@cogoport/components';
import { Link } from '@cogoport/next';
import { useSelector } from '@cogoport/store';
import React, { useState, useEffect } from 'react';

import useGetInvoiceSelection from '../hooks/useInvoiceSelection';

import FinalConfirmation from './FinalConfirmation';
import InvoiceBLCheck from './InvoiceBLCheck';
import InvoiceSelection from './InvoiceSelection';
import MergeDocuments from './MergeDocuments';
import PayabledDetails from './PayableDetails';
import styles from './styles.module.css';
import UploadDocuments from './UploadDocuments';

const STEPS_MAPPING = [
	{ title: 'Invoice selection', key: 'invoice_selection' },
	{ title: 'Invoice - BL check', key: 'invoice_bl_check' },
	{ title: 'Merge Documents', key: 'merge_documents' },
	{ title: 'Upload Documents', key: 'upload_documents' },
	{ title: 'Final Confirmation', key: 'final_confirmation' },
];

function OverSeasAgent() {
	const {
		query,
	} = useSelector(({ general }) => ({
		query: general.query,
	}));
	const [showHeader, setShowHeader] = useState(true);
	const INITIAL_ACTIVE = 'invoice_selection';
	const [active, setActive] = useState(INITIAL_ACTIVE);
	const [bLData, setBLData] = useState([{}]);
	const [showPayableAmount, setShowPayableAmount] = useState();
	const [showSaveAsDraft, setShowSaveAsDraft] = useState(false);
	const { organizationId = '' } = query || {};
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
		if (active === 'merge_documents') {
			return <MergeDocuments setActive={setActive} />;
		}
		if (active === 'invoice_bl_check') {
			return <InvoiceBLCheck setActive={setActive} bLData={bLData} />;
		}
		if (active === 'final_confirmation') {
			return (
				<FinalConfirmation
					setActive={setActive}
					setShowSaveAsDraft={setShowSaveAsDraft}
				/>
			);
		}
		if (active === 'upload_documents') {
			return <UploadDocuments setActive={setActive} />;
		}
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
						organizationId={organizationId}
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
