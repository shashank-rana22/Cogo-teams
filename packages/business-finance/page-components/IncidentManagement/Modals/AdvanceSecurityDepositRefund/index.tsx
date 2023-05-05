import { Modal, Button, Textarea, Tooltip } from '@cogoport/components';
import React, { useState } from 'react';

import GetSecurityDepositRefundData from '../../apisModal/useGetSecurityDepositRefund';
import ApproveAndReject from '../../common/ApproveAndRejectData';
import ViewButton from '../../common/ViewButton';

import styles from './styles.module.css';

function AdvanceSecurityDepositRefund({ advanceSecurityDepositRefund, id, refetch, isEditable = true, row }) {
	const [showDepositModal, setShowDepositModal] = useState(false);
	const [remarkValue, setRemarkValue] = useState('');

	const {
		supplierName = '',
		totalAmount = 0,
		uploadProof = [],
		utrNumber = '',
		remark = '',
		sid = '',
	} = advanceSecurityDepositRefund || {};
	const { getData, loading } = GetSecurityDepositRefundData({
		refetch,
		setShowDepositModal,
		id,
		remarkValue,
	});
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
			<div>
				<ViewButton state={setShowDepositModal} />
			</div>
			{showDepositModal
			&& (
				<Modal
					size="md"
					show={showDepositModal}
					onClose={() => {
						setShowDepositModal(false);
					}}
				>
					<Modal.Header title="Advance Container Security Deposit Refund" />
					<Modal.Body>
						{!isEditable && <ApproveAndReject row={row} />}
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

						{isEditable && (
							<>
								<div className={styles.remarks}>Remarks*</div>
								<Textarea
									name="remark"
									size="md"
									placeholder="Enter Remark Here..."
									onChange={(e: string) => setRemarkValue(e)}
									style={{ width: '700', height: '100px', marginBottom: '12px' }}
								/>
							</>
						)}
					</Modal.Body>
					{isEditable && (
						<Modal.Footer>
							<div className={styles.button}>
								<Button
									size="md"
									themeType="secondary"
									style={{ marginRight: '8px' }}
									disabled={loading}
									onClick={() => {
										getData({ status: 'REJECTED' });
									}}
								>
									Reject
								</Button>

								<Button
									size="md"
									style={{ marginRight: '8px' }}
									disabled={loading}
									onClick={() => {
										getData({ status: 'APPROVED' });
									}}
								>
									Approve
								</Button>
							</div>
						</Modal.Footer>
					)}
				</Modal>
			)}
		</div>
	);
}

export default AdvanceSecurityDepositRefund;
