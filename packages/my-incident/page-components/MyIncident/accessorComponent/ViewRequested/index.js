import React, { useState } from 'react';

import useRaisedAgain from '../../hooks/useRaisedAgain.ts';
import useSave from '../../hooks/useSave.ts';
import NonRecuringModal from '../NonRecuringModal';
import RecuringModal from '../RecuringModal';

import AdvanceSecurityDepositModal from './AdvanceSecurityDepositModal/index.tsx';
import AdvanceSecurityDepositRefundModal from './AdvanceSecurityDepositRefundModal/index.tsx';
import BankDatailsModal from './BankDetailsModal/index.tsx';
import IcJvApproval from './IcJvApproval/index.tsx';
import JournalVoucher from './JournalVoucher/index.tsx';
import PaymentConfirmation from './PaymentConfirmation/index.tsx';
import RequestCN from './RequestCN/index.tsx';
import SettlementModal from './SettlementModal/index.tsx';
import TdsDeviationModal from './TdsDeviationModal/index.tsx';

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
