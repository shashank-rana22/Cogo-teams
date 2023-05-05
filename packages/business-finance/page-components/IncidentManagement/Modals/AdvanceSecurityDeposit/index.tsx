import { Modal, Button, Textarea, Tooltip } from '@cogoport/components';
import React, { useState } from 'react';

import GetSecurityDepositData from '../../apisModal/useGetSecurityDeposit';
import ApproveAndReject from '../../common/ApproveAndRejectData';
import ViewButton from '../../common/ViewButton';

import styles from './styles.module.css';

function AdvanceSecurityDeposit({ advanceSecurityDeposit, id, refetch, isEditable = true, row }) {
	const [showDepositModal, setShowDepositModal] = useState(false);
	const [remarkValue, setRemarkValue] = useState('');

	const {
		advanceDocumentId = '',
		amountPerContainer = 0,
		numberOfContainers = 0,
		paymentMode = '',
		remark = '',
		supplierName = '',
		totalAmountToBePaid = 0,
	} = advanceSecurityDeposit || {};
	const { getData, loading } = GetSecurityDepositData({
		refetch,
		setShowDepositModal,
		id,
		remarkValue,
	});

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
					<Modal.Header title="Advance Container Security Deposit" />
					<Modal.Body>
						{!isEditable && <ApproveAndReject row={row} />}
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

export default AdvanceSecurityDeposit;
