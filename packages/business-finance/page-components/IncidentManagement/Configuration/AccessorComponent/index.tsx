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

function AccessorComponent({ row, getIncidentData }) {
	const { data } = row || {};
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

	const { type, id } = row || {};

	const componentsMap = {
		TDS_APPROVAL: (
			<TDSModal
				tdsData={tdsRequest}
				id={id}
				refetch={getIncidentData}
				row={row}
			/>
		),
		SETTLEMENT_APPROVAL: (
			<SettlementModal
				settlementData={settlementRequest}
				id={id}
				row={row}
				refetch={getIncidentData}
			/>
		),
		BANK_DETAIL_APPROVAL: (
			<BankDetails
				bankData={bankRequest}
				bankId={id}
				organization={organization}
				refetch={getIncidentData}
				row={row}
			/>
		),
		PAYMENT_CONFIRMATION_APPROVAL: (
			<PaymentConfirmation
				paymentConfirmationRequest={paymentConfirmationRequest}
				organization={organization}
				id={id}
				refetch={getIncidentData}
				row={row}
			/>
		),
		ISSUE_CREDIT_NOTE: (
			<RequestCN row={row} refetch={getIncidentData} id={id} />
		),
		CONSOLIDATED_CREDIT_NOTE: (
			<RequestCN row={row} refetch={getIncidentData} id={id} />
		),
		JOURNAL_VOUCHER_APPROVAL: (
			<JvModal
				journalVoucherRequest={journalVoucherRequest}
				id={id}
				refetch={getIncidentData}
				row={row}
			/>
		),
		INTER_COMPANY_JOURNAL_VOUCHER_APPROVAL: (
			<ICJVModal
				interCompanyJournalVoucherRequest={interCompanyJournalVoucherRequest}
				row={row}
				refetch={getIncidentData}
				id={id}
			/>
		),
		CONCOR_PDA_APPROVAL: (
			<ConcorModal
				concorData={concorPdaApprovalRequest}
				id={id}
				refetch={getIncidentData}
			/>
		),
		SEZ_APPROVAL: (
			<SezApproval
				sezRequest={sezRequest}
				organization={organization}
				id={id}
				refetch={getIncidentData}
			/>
		),
		ADVANCE_SECURITY_DEPOSIT: (
			<AdvanceSecurityDeposit
				advanceSecurityDeposit={advanceSecurityDeposit}
				id={id}
				row={row}
				refetch={getIncidentData}
			/>
		),
		ADVANCE_SECURITY_DEPOSIT_REFUND: (
			<AdvanceSecurityDepositRefund
				advanceSecurityDepositRefund={advanceSecurityDepositRefund}
				id={id}
				row={row}
				refetch={getIncidentData}
			/>
		),
	};

	return <div>{componentsMap[type]}</div>;
}

export default AccessorComponent;
