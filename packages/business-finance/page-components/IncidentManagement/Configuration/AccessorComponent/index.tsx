import AdvanceSecurityDeposit from '../../Modals/AdvanceSecurityDeposit';
import AdvanceSecurityDepositRefund from '../../Modals/AdvanceSecurityDepositRefund';
import BankDetails from '../../Modals/BankDetails';
import ConcorModal from '../../Modals/ConcorModal';
import ICJVModal from '../../Modals/ICJV_Modal';
import JobOpen from '../../Modals/JobOpen';
import JvModal from '../../Modals/JvModal';
import NonRecuringModal from '../../Modals/NonRecuringModal';
import PaymentConfirmation from '../../Modals/PaymentConfirmation';
import RecuringModal from '../../Modals/RecuringModal';
import RequestCN from '../../Modals/RequestCN';
import RevokeInvoice from '../../Modals/RevokeInvoice';
import SettlementModal from '../../Modals/SettlementModal';
import SezApproval from '../../Modals/SezApproval';
import TDSModal from '../../Modals/TDSModal';

import getPropsByType from './getPropsByType';

const TYPE_COMPONENT_MAPPING = {
	BANK_DETAIL_APPROVAL                   : BankDetails,
	TDS_APPROVAL                           : TDSModal,
	ISSUE_CREDIT_NOTE                      : RequestCN,
	JOURNAL_VOUCHER_APPROVAL               : JvModal,
	SETTLEMENT_APPROVAL                    : SettlementModal,
	INTER_COMPANY_JOURNAL_VOUCHER_APPROVAL : ICJVModal,
	PAYMENT_CONFIRMATION_APPROVAL          : PaymentConfirmation,
	ADVANCE_SECURITY_DEPOSIT               : AdvanceSecurityDeposit,
	ADVANCE_SECURITY_DEPOSIT_REFUND        : AdvanceSecurityDepositRefund,
	RECURRING_EXPENSE_APPROVAL             : RecuringModal,
	OVERHEAD_APPROVAL                      : NonRecuringModal,
	SEZ_APPROVAL                           : SezApproval,
	CONCOR_PDA_APPROVAL                    : ConcorModal,
	CONSOLIDATED_CREDIT_NOTE               : RequestCN,
	REVOKE_INVOICE                         : RevokeInvoice,
	JOB_OPEN                               : JobOpen,
};

function AccessorComponent({ row, getIncidentData, detailsModal = {}, setDetailsModal = () => {} }) {
	const { type = '', id = '', data, remark = '', status = '', referenceId = '' } = row || {};
	const { organization } = data || {};

	const Component = TYPE_COMPONENT_MAPPING[type] || null;

	if (!Component) {
		return null;
	}

	return (
		<Component
			{...getPropsByType({ type, data, referenceId })}
			id={id}
			organization={organization}
			refetch={getIncidentData}
			row={row}
			isEditable={status === 'REQUESTED'}
			status={status}
			remark={remark}
			detailsModal={detailsModal}
			setDetailsModal={setDetailsModal}
		/>
	);
}

export default AccessorComponent;
