import React, { useState } from 'react';

import useRaisedAgain from '../../hooks/useRaisedAgain';
import useSave from '../../hooks/useSave';

import BankDatailsModal from './BankDetailsModal';
import IcJvApproval from './IcJvApproval';
import JournalVoucher from './JournalVoucher';
import RequestCN from './RequestCN';
import SettlementModal from './SettlementModal';
import TdsDeviationModal from './TdsDeviationModal';

function ViewRequested({ itemData, name, reftech }) {
	const [remarks, setRemarks] = useState('');
	const { type, id } = itemData || {};

	const [selectedFile, setSelectedFile] = useState(null);
	const [showModal, setShowModal] = useState(false);
	const { onSave, loadingOnSave } = useSave({ remarks, id, reftech, setShowModal });
	const { onRaiseAgain, loadingOnRaise } = useRaisedAgain({
		FileUrl: selectedFile?.finalUrl,
		id,
		reftech,
		setShowModal,
	});

	if (type === 'BANK_DETAIL_APPROVAL') {
		return (
			<BankDatailsModal
				itemData={itemData}
				setRemarks={setRemarks}
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
	}
	if (type === 'TDS_APPROVAL') {
		return (
			<TdsDeviationModal
				itemData={itemData}
				setRemarks={setRemarks}
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
	}
	if (type === 'ISSUE_CREDIT_NOTE') {
		return (
			<RequestCN
				itemData={itemData}
				setRemarks={setRemarks}
				onSave={onSave}
				showModal={showModal}
				setShowModal={setShowModal}
				loadingOnSave={loadingOnSave}
			/>
		);
	}
	if (type === 'JOURNAL_VOUCHER_APPROVAL') {
		return (
			<JournalVoucher
				itemData={itemData}
				setRemarks={setRemarks}
				onSave={onSave}
				showModal={showModal}
				setShowModal={setShowModal}
				loadingOnSave={loadingOnSave}
			/>
		);
	}
	if (type === 'SETTLEMENT_APPROVAL') {
		return (
			<SettlementModal
				itemData={itemData}
				setRemarks={setRemarks}
				onSave={onSave}
				showModal={showModal}
				setShowModal={setShowModal}
				loadingOnSave={loadingOnSave}
			/>
		);
	}
	if (type === 'INTER_COMPANY_JOURNAL_VOUCHER_APPROVAL') {
		return (
			<IcJvApproval
				itemData={itemData}
				setRemarks={setRemarks}
				onSave={onSave}
				showModal={showModal}
				setShowModal={setShowModal}
				loadingOnSave={loadingOnSave}
			/>
		);
	}
	return null;
}

export default ViewRequested;
