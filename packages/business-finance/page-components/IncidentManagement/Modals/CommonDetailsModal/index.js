import { Button } from '@cogoport/components';
import React from 'react';

import AdvanceSecurityDeposit from '../AdvanceSecurityDepositDetails';
import AdvanceSecurityDepositRefund from '../AdvanceSecurityRefundDetails';
import JobOpenDetailsModal from '../JobOpen/JobOpenDetailsModal';
import RequestCNDetails from '../RequestCN';
import RevokeInvoiceDetails from '../RevokeInvoiceDetails';
import SezApprovalDetails from '../SezApprovalDetails';
import TdsApprovalDetails from '../TdsApprovalDetails';

import styles from './styles.module.css';

// import ICJVModal from './ICJV_Modal/ICJVDetails';
// import JvModal from './JvModal/JVDetails';
// import NonRecuringModal from './NonRecuringModal/NonRecuringDetails';
// import PaymentConfirmation from './PaymentConfirmation/PaymentConfirmationDetails';
// import RecuringModal from './RecuringModal/RecuringModalDetails';
// import RevokeInvoice from './RevokeInvoice/RevokeInvoiceDetails';
// import SettlementModal from './SettlementModal/SettlementModalDetails';
// import SezApproval from './SezApproval/SezApprovalDetails';
// import BankDetails from '../BankDetails/BankDetails';
// import ConcorModal from '../ConcorModal/ConcorDetails';
// import TDSModal from './TDSModal/TDSDetails';

const TYPE_COMPONENT_MAPPING = {
	// BANK_DETAIL_APPROVAL     : BankDetails,
	TDS_APPROVAL                    : TdsApprovalDetails,
	// JOURNAL_VOUCHER_APPROVAL               : JvModal,
	// SETTLEMENT_APPROVAL                    : SettlementModal,
	// INTER_COMPANY_JOURNAL_VOUCHER_APPROVAL : ICJVModal,
	// PAYMENT_CONFIRMATION_APPROVAL          : PaymentConfirmation,
	// RECURRING_EXPENSE_APPROVAL             : RecuringModal,
	// OVERHEAD_APPROVAL                      : NonRecuringModal,
	SEZ_APPROVAL                    : SezApprovalDetails,
	// CONCOR_PDA_APPROVAL      : ConcorModal,
	// CONSOLIDATED_CREDIT_NOTE               : RequestCNDetails,
	REVOKE_INVOICE                  : RevokeInvoiceDetails,
	ADVANCE_SECURITY_DEPOSIT        : AdvanceSecurityDeposit,
	ADVANCE_SECURITY_DEPOSIT_REFUND : AdvanceSecurityDepositRefund,
	ISSUE_CREDIT_NOTE               : RequestCNDetails,
	JOB_OPEN                        : JobOpenDetailsModal,
};
function CommonDetailsModal({
	setDetailsModal = () => {},
	detailsModal = {},
	refetch = () => {},
}) {
	const Component = TYPE_COMPONENT_MAPPING[detailsModal?.type] || null;

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
