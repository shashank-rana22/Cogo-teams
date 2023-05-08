import { Button, Tooltip } from '@cogoport/components';
import React from 'react';

import AdvanceDepositCommonModal from '../AdvanceDepositCommonModal';

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
		{ title: 'Supplier Name', value: supplierName },
		{ title: 'Shipment ID', value: advanceDocumentId },
		{ title: 'Amount Per container', value: amountPerContainer },
		{ title: 'Number of containers', value: numberOfContainers },
		{ title: 'Total Amount to be paid', value: totalAmountToBePaid },
		{ title: 'Payment Mode', value: paymentMode },
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
				<div className={styles.remark_overflow}>
					{remark}
					...
				</div>
			</Tooltip>
		) : (
			remark
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
				<AdvanceDepositCommonModal
					securityDepositDetails={securityDepositDetails}
					itemData={itemData}
					showModal={showModal}
					setShowModal={setShowModal}
					type="SecurityDeposit"
				/>
			)}
		</div>
	);
}

export default AdvanceSecurityDepositModal;
