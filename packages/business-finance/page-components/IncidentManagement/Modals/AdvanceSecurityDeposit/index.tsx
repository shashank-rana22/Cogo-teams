import React, { useState } from 'react';

import GetSecurityDepositData from '../../apisModal/useGetSecurityDeposit';
import ViewButton from '../../common/ViewButton';
import SecurityDepositCommonModal from '../AdvanceSecurityDepositCommonModal';

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
interface Props {
	advanceSecurityDeposit?: DepositInterface,
	id?: string,
	refetch?:()=>void,
	isEditable?:boolean,
	row?:object,
}
function AdvanceSecurityDeposit({ advanceSecurityDeposit, id, refetch, isEditable = true, row }:Props) {
	const [showDepositModal, setShowDepositModal] = useState(false);
	const [remarkValue, setRemarkValue] = useState('');

	const { getData, loading } = GetSecurityDepositData({
		refetch,
		setShowDepositModal,
		id,
		remarkValue,
	});

	return (
		<div>
			<div>
				<ViewButton state={setShowDepositModal} />
			</div>
			{showDepositModal
			&& (
				<SecurityDepositCommonModal
					securityDepositDetails={SecurityDepositData({ advanceSecurityDeposit })}
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
