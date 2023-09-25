import { Button } from '@cogoport/components';
import React from 'react';

// import JobOpenDetailsModal from '../JobOpen/JobOpenDetailsModal';
// import RequestCNDetails from '../RequestCN';

// import ConcorModal from './.ConcorModal/ConcorDetails';
// import AdvanceSecurityDeposit from './AdvanceSecurityDeposit/AdvanceSecurityDepositDetails';
// import AdvanceSecurityDepositRefund from './AdvanceSecurityDepositRefund/AdvanceSecurityDepositRefundDetails';
// import BankDetails from './BankDetails/BankDetails';
// import ICJVModal from './ICJV_Modal/ICJVDetails';
// import JvModal from './JvModal/JVDetails';
// import NonRecuringModal from './NonRecuringModal/NonRecuringDetails';
// import PaymentConfirmation from './PaymentConfirmation/PaymentConfirmationDetails';
// import RecuringModal from './RecuringModal/RecuringModalDetails';
// import RevokeInvoice from './RevokeInvoice/RevokeInvoiceDetails';
// import SettlementModal from './SettlementModal/SettlementModalDetails';
// import SezApproval from './SezApproval/SezApprovalDetails';
import styles from './styles.module.css';
// import TDSModal from './TDSModal/TDSDetails';

const TYPE_COMPONENT_MAPPING = {
	// BANK_DETAIL_APPROVAL                   : BankDetails,
	// TDS_APPROVAL                           : TDSModal,
	// JOURNAL_VOUCHER_APPROVAL               : JvModal,
	// SETTLEMENT_APPROVAL                    : SettlementModal,
	// INTER_COMPANY_JOURNAL_VOUCHER_APPROVAL : ICJVModal,
	// PAYMENT_CONFIRMATION_APPROVAL          : PaymentConfirmation,
	// ADVANCE_SECURITY_DEPOSIT               : AdvanceSecurityDeposit,
	// ADVANCE_SECURITY_DEPOSIT_REFUND        : AdvanceSecurityDepositRefund,
	// RECURRING_EXPENSE_APPROVAL             : RecuringModal,
	// OVERHEAD_APPROVAL                      : NonRecuringModal,
	// SEZ_APPROVAL                           : SezApproval,
	// CONCOR_PDA_APPROVAL                    : ConcorModal,
	// CONSOLIDATED_CREDIT_NOTE               : RequestCNDetails,
	// REVOKE_INVOICE                         : RevokeInvoice,
	// ISSUE_CREDIT_NOTE                      : RequestCNDetails,
	// JOB_OPEN                               : JobOpenDetailsModal,
};
function CommonDetailsModal({
	setDetailsModal = () => {},
	detailsModal = {},
	refetch = () => {},
}) {
	const Component = TYPE_COMPONENT_MAPPING[detailsModal?.type] || null;

	console.log(detailsModal, 'mayank');

	if (!Component) {
		return null;
	}

	return (
		<div className={styles.containerDisplay}>
			<Button
				size="md"
				themeType="secondary"
				onClick={() => setDetailsModal(null)}
				className={styles.go_back_button}
			>
				Go Back
			</Button>

			<Component
				row={detailsModal}
				setDetailsModal={setDetailsModal}
				refetch={refetch}
			/>

			{/* { detailsModal?.type === 'TDS_APPROVAL' ? (
				<JobOpenDetailsModal
					row={detailsModal}
					setDetailsModal={setDetailsModal}
					refetch={refetch}
				/>
			) : null } */}
		</div>
	);
}
export default CommonDetailsModal;
