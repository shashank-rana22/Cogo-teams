import { Breadcrumb, Button, Stepper, Toggle } from '@cogoport/components';
import { Link } from '@cogoport/next';
import { useSelector } from '@cogoport/store';
import React, { useState, useEffect } from 'react';

import useGetInvoiceSelection from '../hooks/useInvoiceSelection';
import useListGetSelectedPayrunActiveTab from '../hooks/useListGetSelectedPayrunActiveTab';

import PayabledDetails from './PayableDetails';
import styles from './styles.module.css';
import RenderData from './utils/RenderData';

const STEPS_MAPPING = [
	{ title: 'Invoice selection', key: 'invoice_selection' },
	{ title: 'Invoice - BL check', key: 'invoice_bl_check' },
	{ title: 'Merge Documents', key: 'merge_documents' },
	{ title: 'Upload Documents', key: 'upload_documents' },
	{ title: 'Final Confirmation', key: 'final_confirmation' },
];

const MIN_AMOUNT = 0;

function OverSeasAgent() {
	const {
		query,
	} = useSelector(({ general }) => ({
		query: general.query,
	}));

	const handleVersionChange = () => {
		window.location.href = `/${query.partner_id}/business-finance/account-payables/invoices/over-seas-agent?
		organizationId=${query.organizationId}&services=${query.services}&payrun_type=${query.payrun_type}
		&payrun=${query.payrun}&currency=${query.currency}&entity=${query.entity}`;
	};

	const [showHeader, setShowHeader] = useState(true);
	const INITIAL_ACTIVE = 'invoice_selection';
	const [active, setActive] = useState(INITIAL_ACTIVE);
	const [bLData, setBLData] = useState([{}]);
	const [showPayableAmount, setShowPayableAmount] = useState(MIN_AMOUNT);
	const [showSaveAsDraft, setShowSaveAsDraft] = useState(false);
	const { organizationId = '', payrun = '' } = query || {};
	const { goBack, onClear, currency } = useGetInvoiceSelection({});

	const { defaultTab = '' } = useListGetSelectedPayrunActiveTab({ payrun });
	useEffect(() => {
		if (defaultTab) {
			setActive(defaultTab);
		}
	}, [defaultTab]);

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

				<div className={styles.breadcrumb}>
					<Toggle
						name="toggle"
						size="md"
						onLabel="Old"
						offLabel="New"
						onChange={handleVersionChange}
					/>

					<Button
						size="sm"
						themeType="accent"
						onClick={() => {
							goBack();
							onClear();
						}}
						disabled={showSaveAsDraft}
						style={{ width: '100px', margin: '0px 10px' }}
					>
						Save as Draft

					</Button>
				</div>
			</div>

			{showHeader ? (
				<>
					<PayabledDetails
						organizationId={organizationId}
						showPayableAmount={showPayableAmount}
						currency={currency}
					/>

					<Stepper active={active} setActive={setActive} items={STEPS_MAPPING} arrowed />
				</>
			) : null}

			<RenderData
				active={active}
				setActive={setActive}
				bLData={bLData}
				setShowSaveAsDraft={setShowSaveAsDraft}
				setBLData={setBLData}
				setShowHeader={setShowHeader}
				setShowPayableAmount={setShowPayableAmount}
			/>

		</div>
	);
}

export default OverSeasAgent;
