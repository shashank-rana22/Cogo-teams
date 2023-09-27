import { Button } from '@cogoport/components';
import React from 'react';

import AdvanceSecurityDeposit from '../AdvanceSecurityDepositDetails';
import AdvanceSecurityDepositRefund from '../AdvanceSecurityRefundDetails';
import BankAccountDetails from '../BankAccountDetails';
import ConcorDetails from '../ConcorPDADetails';
import JobOpenDetailsModal from '../JobOpen/JobOpenDetailsModal';
import NonRecuring from '../NonRecuringDetails';
import PaymentDetails from '../PaymentDetails';
import RecuringDetails from '../RecuringDetails';
import RequestCNDetails from '../RequestCNDetails';
import RevokeInvoiceDetails from '../RevokeInvoiceDetails';
import SezApprovalDetails from '../SezApprovalDetails';
import TdsApprovalDetails from '../TdsApprovalDetails';

import styles from './styles.module.css';

const TYPE_COMPONENT_MAPPING = {
	BANK_DETAIL_APPROVAL            : BankAccountDetails,
	TDS_APPROVAL                    : TdsApprovalDetails,
	PAYMENT_CONFIRMATION_APPROVAL   : PaymentDetails,
	RECURRING_EXPENSE_APPROVAL      : RecuringDetails,
	OVERHEAD_APPROVAL               : NonRecuring,
	SEZ_APPROVAL                    : SezApprovalDetails,
	CONCOR_PDA_APPROVAL             : ConcorDetails,
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
		</div>
	);
}
export default CommonDetailsModal;
