import { Button } from '@cogoport/components';
import React from 'react';

import AdvanceDepositCommonModal from '../AdvanceDepositCommonModal';

import SecurityDepositData from './securityDepositData';

interface DepositInterface {
	advanceDocumentId?: string,
	amountPerContainer?:number,
	numberOfContainers?:number,
	totalAmountToBePaid?:number,
	paymentMode?: string,
	remark?: string,
	supplierName?: string,
}
interface ItemInterface {
	status?:string,
	data?:{ advanceSecurityDeposit?: DepositInterface },
}
interface Props {
	itemData?:ItemInterface,
	showModal?: boolean,
	setShowModal?:React.Dispatch<React.SetStateAction<boolean>>,
}
function AdvanceSecurityDepositModal({ itemData, showModal, setShowModal }:Props) {
	const { status, data } = itemData || {};
	const { advanceSecurityDeposit } = data || {};

	return (
		<div>
			{status === 'REJECTED'
				&& <Button size="sm" themeType="tertiary" onClick={() => { setShowModal(true); }}>View</Button>}
			{status === 'APPROVED'
            && <Button size="md" themeType="secondary" onClick={() => { setShowModal(true); }}>View</Button>}

			{showModal
			&& (
				<AdvanceDepositCommonModal
					securityDepositDetails={SecurityDepositData({ advanceSecurityDeposit })}
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
