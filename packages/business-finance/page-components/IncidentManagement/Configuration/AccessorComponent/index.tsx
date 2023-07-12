import AdvanceSecurityDeposit from '../../Modals/AdvanceSecurityDeposit';
import AdvanceSecurityDepositRefund from '../../Modals/AdvanceSecurityDepositRefund';
import BankDetails from '../../Modals/BankDetails';
import ConcorModal from '../../Modals/ConcorModal';
import ICJVModal from '../../Modals/ICJV_Modal';
import JvModal from '../../Modals/JvModal';
import OverheadsModal from '../../Modals/OverheadsModal';
import PaymentConfirmation from '../../Modals/PaymentConfirmation';
import RequestCN from '../../Modals/RequestCN';
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
	SEZ_APPROVAL                           : SezApproval,
	CONCOR_PDA_APPROVAL                    : ConcorModal,
	CONSOLIDATED_CREDIT_NOTE               : RequestCN,
	OVERHEAD_APPROVAL                      : OverheadsModal,
};

function AccessorComponent({ row, getIncidentData }) {
	const { type = '', id = '', data, remark = '', status = '' } = row || {};
	const { organization } = data || {};

	const Component = TYPE_COMPONENT_MAPPING[type] || null;

	if (!Component) {
		return null;
	}

	return (
		<Component
			{...getPropsByType(type, data)}
			id={id}
			organization={organization}
			refetch={getIncidentData}
			row={row}
			isEditable={status === 'REQUESTED'}
			status={status}
			remark={remark}
		/>
	);
}

export default AccessorComponent;
