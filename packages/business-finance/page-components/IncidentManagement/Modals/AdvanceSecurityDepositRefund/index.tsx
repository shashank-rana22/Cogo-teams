import React, { useState } from 'react';

import GetSecurityDepositData from '../../apisModal/useGetSecurityDeposit';
import ViewButton from '../../common/ViewButton';
import SecurityDepositCommonModal from '../AdvanceSecurityDepositCommonModal';

import SecurityDepositRefundData from './securityDeositRefundData';

interface DepositRefundInterface {
	totalAmount?:number,
	sid?: string,
	utrNumber?: string,
	remark?: string,
	supplierName?: string,
	uploadProof?:string[],
}
interface Props {
	advanceSecurityDepositRefund?: DepositRefundInterface,
	id?: string,
	refetch?:()=>void,
	isEditable?:boolean,
	row?:object,
}

function AdvanceSecurityDepositRefund({ advanceSecurityDepositRefund, id, refetch, isEditable = true, row }:Props) {
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
					securityDepositDetails={SecurityDepositRefundData({ advanceSecurityDepositRefund })}
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
