import { Tooltip } from '@cogoport/components';
import React, { useState } from 'react';

import GetSecurityDepositRefundData from '../../apisModal/useGetSecurityDepositRefund';
import ViewButton from '../../common/ViewButton';
import SecurityDepositCommonModal from '../AdvanceSecurityDepositCommonModal';

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
		{ title: 'Supplier Name', value:	supplierName },
		{ title: 'Shipment ID', value:	sid },
		{ title: 'Total Amount', value:	totalAmount },
		{ title: 'UTR Number', value:	utrNumber },
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
		{
			title: 'Upload Proof',
			value:
	<div>

		{(uploadProof || []).map((url:any) => (url !== '' ? (
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
				<SecurityDepositCommonModal
					securityDepositDetails={securityDepositDetails}
					showDepositModal={showDepositModal}
					setShowDepositModal={setShowDepositModal}
					isEditable={isEditable}
					row={row}
					getData={getData}
					loading={loading}
					setRemarkValue={setRemarkValue}
					type="SecurityDepositRefund"
				/>
			)}
		</div>
	);
}

export default AdvanceSecurityDepositRefund;
