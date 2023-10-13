import React, { useState } from 'react';

import useRaisedAgain from '../../hooks/useRaisedAgain';
import useSave from '../../hooks/useSave';
import NonRecuringModal from '../NonRecuringModal';
import RecuringModal from '../RecuringModal';

import AdvanceSecurityDepositModal from './AdvanceSecurityDepositModal/index';
import AdvanceSecurityDepositRefundModal from './AdvanceSecurityDepositRefundModal/index';
import BankDatailsModal from './BankDetailsModal/index';
import IcJvApproval from './IcJvApproval/index';
import JobOpenModal from './JobOpenModal/index';
import JournalVoucher from './JournalVoucher/index';
import PaymentConfirmation from './PaymentConfirmation/index';
import RequestCN from './RequestCN/index';
import SettlementModal from './SettlementModal/index';
import TdsDeviationModal from './TdsDeviationModal/index';

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
