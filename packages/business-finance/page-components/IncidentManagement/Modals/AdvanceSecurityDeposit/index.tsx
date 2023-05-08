import { Tooltip } from '@cogoport/components';
import React, { useState } from 'react';

import GetSecurityDepositData from '../../apisModal/useGetSecurityDeposit';
import ViewButton from '../../common/ViewButton';
import SecurityDepositCommonModal from '../AdvanceSecurityDepositCommonModal';

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
			<div>
				<ViewButton state={setShowDepositModal} />
			</div>
			{showDepositModal
			&& (
				<SecurityDepositCommonModal
					securityDepositDetails={securityDepositDetails}
					showDepositModal={showDepositModal}
					setShowDepositModal={setShowDepositModal}
					isEditable={isEditable}
					row={row}
					getData={getData}
					loading={loading}
					setRemarkValue={setRemarkValue}
					type="SecurityDeposit"
				/>
			)}
		</div>
	);
}

export default AdvanceSecurityDeposit;
