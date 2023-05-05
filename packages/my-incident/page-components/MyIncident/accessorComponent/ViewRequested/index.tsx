import React, { useState } from 'react';

import useRaisedAgain from '../../hooks/useRaisedAgain';
import useSave from '../../hooks/useSave';

import AdvanceSecurityDepositModal from './AdvanceSecurityDepositModal';
import AdvanceSecurityDepositRefundModal from './AdvanceSecurityDepositRefundModal';
import BankDatailsModal from './BankDetailsModal';
import IcJvApproval from './IcJvApproval';
import JournalVoucher from './JournalVoucher';
import RequestCN from './RequestCN';
import SettlementModal from './SettlementModal';
import TdsDeviationModal from './TdsDeviationModal';

function ViewRequested({ itemData, name, refetch }) {
	const [remarks, setRemarks] = useState('');
	const { type, id } = itemData || {};

	const [selectedFile, setSelectedFile] = useState(null);
	const [showModal, setShowModal] = useState(false);
	const { onSave, loadingOnSave } = useSave({ remarks, id, refetch, setShowModal });
	const { onRaiseAgain, loadingOnRaise } = useRaisedAgain({
		FileUrl: selectedFile,
		id,
		refetch,
		setShowModal,
	});
	console.log(itemData, 'type', type);

	switch (type) {
		case 'BANK_DETAIL_APPROVAL':
			return (
				<BankDatailsModal
					itemData={itemData}
					setRemarks={setRemarks}
					remarks={remarks}
					onSave={onSave}
					onRaiseAgain={onRaiseAgain}
					setSelectedFile={setSelectedFile}
					selectedFile={selectedFile}
					name={name}
					showModal={showModal}
					setShowModal={setShowModal}
					loadingOnSave={loadingOnSave}
					loadingOnRaise={loadingOnRaise}
				/>
			);

		case 'TDS_APPROVAL':
			return (
				<TdsDeviationModal
					itemData={itemData}
					setRemarks={setRemarks}
					onSave={onSave}
					remarks={remarks}
					onRaiseAgain={onRaiseAgain}
					setSelectedFile={setSelectedFile}
					selectedFile={selectedFile}
					name={name}
					showModal={showModal}
					setShowModal={setShowModal}
					loadingOnSave={loadingOnSave}
					loadingOnRaise={loadingOnRaise}
				/>
			);
		case 'ISSUE_CREDIT_NOTE':
			return (
				<RequestCN
					itemData={itemData}
					setRemarks={setRemarks}
					remarks={remarks}
					onSave={onSave}
					showModal={showModal}
					setShowModal={setShowModal}
					loadingOnSave={loadingOnSave}
				/>
			);
		case 'JOURNAL_VOUCHER_APPROVAL':
			return (
				<JournalVoucher
					itemData={itemData}
					setRemarks={setRemarks}
					onSave={onSave}
					remarks={remarks}
					showModal={showModal}
					setShowModal={setShowModal}
					loadingOnSave={loadingOnSave}
				/>
			);
		case 'SETTLEMENT_APPROVAL':
			return (
				<SettlementModal
					itemData={itemData}
					setRemarks={setRemarks}
					onSave={onSave}
					remarks={remarks}
					showModal={showModal}
					setShowModal={setShowModal}
					loadingOnSave={loadingOnSave}
				/>
			);
		case 'INTER_COMPANY_JOURNAL_VOUCHER_APPROVAL':
			return (
				<IcJvApproval
					itemData={itemData}
					setRemarks={setRemarks}
					remarks={remarks}
					onSave={onSave}
					showModal={showModal}
					setShowModal={setShowModal}
					loadingOnSave={loadingOnSave}
				/>
			);
		case 'ADVANCE_SECURITY_DEPOSIT':
			return (
				<AdvanceSecurityDepositModal
					itemData={itemData}
					showModal={showModal}
					setShowModal={setShowModal}
				/>
			);
		case 'ADVANCE_SECURITY_DEPOSIT_REFUND': return (
			<AdvanceSecurityDepositRefundModal
				itemData={itemData}
				showModal={showModal}
				setShowModal={setShowModal}
			/>
		);
		default:
			return null;
	}
}

export default ViewRequested;
