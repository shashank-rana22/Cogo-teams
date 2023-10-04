import { Button } from '@cogoport/components';
import React from 'react';

import AdvanceDepositCommonModal from '../AdvanceDepositCommonModal';

import SecurityDepositRefundData from './securityDeositRefundData';

interface DepositInterface {
	utrNumber?: string,
	totalAmount?:number,
	sid?: string,
	remark?: string,
	supplierName?: string,
	uploadProof?: object[],
}
interface ItemInterface {
	status?:string,
	data?:{ advanceSecurityDepositRefund?: DepositInterface },
}
interface Props {
	itemData?:ItemInterface,
	showModal?: boolean,
	setShowModal?:React.Dispatch<React.SetStateAction<boolean>>,
}

function AdvanceSecurityDepositRefundModal({
	itemData,
	showModal,
	setShowModal,
}:Props) {
	const { status, data } = itemData || {};
	const { advanceSecurityDepositRefund } = data || {};

	return (
		<div>
			{status === 'REJECTED'
				&& <Button size="sm" themeType="tertiary" onClick={() => { setShowModal(true); }}>View</Button>}
			{status === 'APPROVED'
            && <Button size="md" themeType="secondary" onClick={() => { setShowModal(true); }}>View</Button>}

			{showModal
			&& (
				<AdvanceDepositCommonModal
					securityDepositDetails={SecurityDepositRefundData({ advanceSecurityDepositRefund })}
					itemData={itemData}
					showModal={showModal}
					setShowModal={setShowModal}
					type="SecurityDepositRefund"
				/>
			)}
		</div>
	);
}

export default AdvanceSecurityDepositRefundModal;
