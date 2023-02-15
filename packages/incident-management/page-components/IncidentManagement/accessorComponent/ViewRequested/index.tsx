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
	const { type, id, data } = itemData || {};
	const { bankRequest, tdsRequest } = data || {};
	const { documentUrls } = bankRequest || tdsRequest || {};
	const { onSave } = useSave({ remarks, id, reftech });
	const [selectedFile, setSelectedFile] = useState([]);
	const FileUrl = [];
	if (selectedFile) {
		selectedFile.map((item) => (
			FileUrl.push(item.finalUrl)
		));
	}
	if (documentUrls) {
		documentUrls.map((item) => (
			FileUrl.push(item)
		));
	}
	const { onRaiseAgain } = useRaisedAgain({ FileUrl, id, reftech });

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
			/>
		);
	}
	if (type === 'ISSUE_CREDIT_NOTE') {
		return (
			<RequestCN itemData={itemData} setRemarks={setRemarks} onSave={onSave} />
		);
	}
	if (type === 'JOURNAL_VOUCHER_APPROVAL') {
		return (
			<JournalVoucher itemData={itemData} setRemarks={setRemarks} onSave={onSave} />
		);
	}
	if (type === 'SETTLEMENT_APPROVAL') {
		return (
			<SettlementModal itemData={itemData} setRemarks={setRemarks} onSave={onSave} />
		);
	}
	if (type === 'INTER_COMPANY_JOURNAL_VOUCHER_APPROVAL') {
		return (
			<IcJvApproval itemData={itemData} setRemarks={setRemarks} onSave={onSave} />
		);
	}
	return null;
}

export default ViewRequested;
