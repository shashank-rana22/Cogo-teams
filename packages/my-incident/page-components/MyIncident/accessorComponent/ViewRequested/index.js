import React, { useState } from 'react';

import useRaisedAgain from '../../hooks/useRaisedAgain.js';
import useSave from '../../hooks/useSave.js';
import NonRecuringModal from '../NonRecuringModal';
import RecuringModal from '../RecuringModal';

import AdvanceSecurityDepositModal from './AdvanceSecurityDepositModal/index.js';
import AdvanceSecurityDepositRefundModal from './AdvanceSecurityDepositRefundModal/index.js';
import BankDatailsModal from './BankDetailsModal/index.js';
import IcJvApproval from './IcJvApproval/index.js';
import JobOpenModal from './JobOpenModal/index.js';
import JournalVoucher from './JournalVoucher/index.js';
import PaymentConfirmation from './PaymentConfirmation/index.js';
import RequestCN from './RequestCN/index.js';
import SettlementModal from './SettlementModal/index.js';
import TdsDeviationModal from './TdsDeviationModal/index.js';

const TYPE_COMPONENT_MAPPING = {
	BANK_DETAIL_APPROVAL                   : BankDatailsModal,
	TDS_APPROVAL                           : TdsDeviationModal,
	ISSUE_CREDIT_NOTE                      : RequestCN,
	JOURNAL_VOUCHER_APPROVAL               : JournalVoucher,
	SETTLEMENT_APPROVAL                    : SettlementModal,
	INTER_COMPANY_JOURNAL_VOUCHER_APPROVAL : IcJvApproval,
	PAYMENT_CONFIRMATION_APPROVAL          : PaymentConfirmation,
	ADVANCE_SECURITY_DEPOSIT               : AdvanceSecurityDepositModal,
	ADVANCE_SECURITY_DEPOSIT_REFUND        : AdvanceSecurityDepositRefundModal,
	RECURRING_EXPENSE_APPROVAL             : RecuringModal,
	OVERHEAD_APPROVAL                      : NonRecuringModal,
	JOB_OPEN                               : JobOpenModal,
};

function ViewRequested({ itemData = {}, name = '', refetch = () => {} }) {
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

	const Component = TYPE_COMPONENT_MAPPING[type] || null;

	if (!Component) {
		return null;
	}

	return (
		<Component
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
			refetch={refetch}
		/>
	);
}

export default ViewRequested;
