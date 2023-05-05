import { Modal, Button, Tooltip } from '@cogoport/components';
import React from 'react';

import ApproveAndRejectHeader from '../../ApproveAndRejectHeader';

import styles from './styles.module.css';

function AdvanceSecurityDepositRefundModal({
	itemData,
	showModal,
	setShowModal,
}) {
	const { status, data } = itemData || {};
	const { advanceSecurityDepositRefund } = data || {};
	const {
		supplierName = '',
		totalAmount = 0,
		uploadProof = [],
		utrNumber = '',
		remark = '',
		sid = '',
	} = advanceSecurityDepositRefund || {};

	const securityDepositDetails = [
		{ title: 'Supplier Name', value: <div>{supplierName || ''}</div> },
		{ title: 'Shipment ID', value: <div>{sid || ''}</div> },
		{ title: 'Total Amount', value: <div>{totalAmount || ''}</div> },
		{ title: 'UTR Number', value: <div>{utrNumber || ''}</div> },
		{
			title: 'Remark',
			value:
	<div>
		{remark?.length >= 30 ? (
			<Tooltip
				placement="top"
				content={<div className={styles.tooltip_text}>{remark}</div>}
				interactive
			>
				<div>
					{remark?.substring(0, 30)}
					...
				</div>
			</Tooltip>
		) : (
			<div>{remark || ''}</div>
		)}
	</div>,
		},
		{
			title: 'Upload Proof',
			value:
	<div>

		{(uploadProof || [])?.map((url:any) => (url !== '' ? (
			<a href={url} target="_blank" rel="noreferrer">
				<div className={styles.view_flex}>
					<div className={styles.view}>link</div>
				</div>
			</a>
		) : (
			<div> No document available</div>
		)))}
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
					<Modal.Header title="Advance Container Security Deposit Refund" />
					<Modal.Body>
						<ApproveAndRejectHeader row={itemData} />
						{securityDepositDetails?.map((itm) => (
							<div key={itm?.title} className={styles.flex}>
								<div className={styles.title}>
									{itm?.title}
								</div>
								<div className={styles.divider}>
									:
								</div>
								<div className={styles.name}>
									<div>{itm?.value}</div>
								</div>
							</div>
						))	}
					</Modal.Body>
				</Modal>
			)}
		</div>
	);
}

export default AdvanceSecurityDepositRefundModal;
