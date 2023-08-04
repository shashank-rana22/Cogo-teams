import AdvanceSecurityDeposit from '../../Modals/AdvanceSecurityDeposit';
import AdvanceSecurityDepositRefund from '../../Modals/AdvanceSecurityDepositRefund';
import BankDetails from '../../Modals/BankDetails';
import ConcorModal from '../../Modals/ConcorModal';
import ICJVModal from '../../Modals/ICJV_Modal';
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

interface Row {
	type: string;
	id: string;
	data: {
		organization: string;
	};
	remark: string;
	status: string;
	getIncidentData: Function;
}

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
	RECURRING_EXPENSE_APPROVAL             : RecuringModal,
	OVERHEAD_APPROVAL                      : NonRecuringModal,
	REVOKE_INVOICE                         : RevokeInvoice,
};

function AccessorComponent({ row = {} as Row, getIncidentData = () => {} }: { row?: Row; getIncidentData?: Function }) {
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
