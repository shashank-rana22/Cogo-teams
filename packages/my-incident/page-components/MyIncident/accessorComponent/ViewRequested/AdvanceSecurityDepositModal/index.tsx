import { Modal, Button, Tooltip } from '@cogoport/components';
import React from 'react';

import ApproveAndRejectHeader from '../../ApproveAndRejectHeader';

import styles from './styles.module.css';

function AdvanceSecurityDepositModal({ itemData, showModal, setShowModal }) {
	const { status, data } = itemData || {};
	const { advanceSecurityDeposit } = data || {};
	const {
		advanceDocumentId = '',
		amountPerContainer = 0,
		numberOfContainers = 0,
		paymentMode = '',
		remark = '',
		supplierName = '',
		totalAmountToBePaid = 0,
	} = advanceSecurityDeposit || {};

	const securityDepositDetails = [
		{ title: 'Supplier Name', value: <div>{supplierName || ''}</div> },
		{ title: 'Shipment ID', value: <div>{advanceDocumentId || ''}</div> },
		{ title: 'Amount Per container', value: <div>{amountPerContainer || ''}</div> },
		{ title: 'Number of containers', value: <div>{numberOfContainers || ''}</div> },
		{ title: 'Total Amount to be paid', value: <div>{totalAmountToBePaid || ''}</div> },
		{ title: 'Payment Mode', value: <div>{paymentMode || ''}</div> },
		{
			title: 'Remark',
			value:
	<div>
		{remark.length >= 30 ? (
			<Tooltip
				placement="top"
				content={<div className={styles.tooltip_text}>{remark}</div>}
				interactive
			>
				<div>
					{remark.substring(0, 30)}
					...
				</div>
			</Tooltip>
		) : (
			<div>{remark || ''}</div>
		)}
	</div>,
		},
	];
	return (
		<div>
			{status === 'REJECTED'
				&& <Button size="sm" themeType="tertiary" onClick={() => { setShowModal(true); }}>View</Button>}
			{status === 'APPROVED'
            && <Button size="md" themeType="secondary" onClick={() => { setShowModal(true); }}>View</Button>}

			{showModal
			&& (
				<Modal
					size="md"
					show={showModal}
					onClose={() => {
						setShowModal(false);
					}}
				>
					<Modal.Header title="Advance Container Security Deposit" />
					<Modal.Body>
						<ApproveAndRejectHeader row={itemData} />
						{securityDepositDetails?.map((itm) => (
							<div key={itm.title} className={styles.flex}>
								<div className={styles.title}>
									{itm.title}
								</div>
								<div className={styles.divider}>
									:
								</div>
								<div className={styles.name}>
									<div>{itm.value}</div>
								</div>
							</div>
						))	}

					</Modal.Body>
				</Modal>
			)}
		</div>
	);
}

export default AdvanceSecurityDepositModal;
