import AdvanceSecurityDeposit from '../../Modals/AdvanceSecurityDeposit';
import AdvanceSecurityDepositRefund from '../../Modals/AdvanceSecurityDepositRefund';
import BankDetails from '../../Modals/BankDetails';
import ConcorModal from '../../Modals/ConcorModal';
import ICJVModal from '../../Modals/ICJV_Modal';
import JvModal from '../../Modals/JvModal';
import PaymentConfirmation from '../../Modals/PaymentConfirmation';
import RequestCN from '../../Modals/RequestCN';
import SettlementModal from '../../Modals/SettlementModal';
import SezApproval from '../../Modals/SezApproval';
import TDSModal from '../../Modals/TDSModal';

const typeComponentMapping = {
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
};

function AccessorComponent({ row, getIncidentData }) {
	const { type = '', id = '', data = '', remark = '', status = '' } = row || {};
	const {
		tdsRequest,
		bankRequest,
		organization,
		settlementRequest,
		journalVoucherRequest,
		interCompanyJournalVoucherRequest,
		concorPdaApprovalRequest,
		sezRequest,
		paymentConfirmationRequest,
		advanceSecurityDeposit,
		advanceSecurityDepositRefund,
	} = data || {};

	const Component = typeComponentMapping[type] || {};

	if (!Component) {
		return null;
	}

	return (
		<Component
			tdsData={tdsRequest}
			bankData={bankRequest}
			settlementData={settlementRequest}
			concorData={concorPdaApprovalRequest}
			journalVoucherRequest={journalVoucherRequest}
			interCompanyJournalVoucherRequest={interCompanyJournalVoucherRequest}
			sezRequest={sezRequest}
			paymentConfirmationRequest={paymentConfirmationRequest}
			advanceSecurityDeposit={advanceSecurityDeposit}
			advanceSecurityDepositRefund={advanceSecurityDepositRefund}
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
