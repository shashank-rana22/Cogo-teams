import { useTranslation } from 'next-i18next';
import React, { useState } from 'react';

import useGetSecurityDepositData from '../../apisModal/useGetSecurityDeposit';
import ViewButton from '../../common/ViewButton';
import SecurityDepositCommonModal from '../AdvanceSecurityDepositCommonModal';

import securityDepositRefundData from './securityDeositRefundData';

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
	const { t } = useTranslation(['incidentManagement']);

	const { getData, loading } = useGetSecurityDepositData({
		refetch,
		setShowDepositModal,
		id,
		remarkValue,
		t,
	});
	return (
		<div>
			<div>
				<ViewButton state={setShowDepositModal} />
			</div>
			{showDepositModal
			&& (
				<SecurityDepositCommonModal
					securityDepositDetails={securityDepositRefundData({ advanceSecurityDepositRefund, t })}
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
