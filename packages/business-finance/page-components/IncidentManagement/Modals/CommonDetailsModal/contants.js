import AdvanceSecurityDeposit from '../AdvanceSecurityDepositDetails/Details';
import AdvanceSecurityDepositRefund from '../AdvanceSecurityRefundDetails/Details';
import BankAccountDetails from '../BankAccountDetails/Details';
import ConcorDetails from '../ConcorPDADetails/Details';
import JobOpenDetailsModal from '../JobOpen/JobOpenDetailsModal';
import NonRecuring from '../NonRecuringDetails/Details';
import PaymentApproval from '../PaymentApproval';
import PaymentDetails from '../PaymentDetails/Details';
import RecuringDetails from '../RecuringDetails/Details';
import RequestCNDetails from '../RequestCNDetails/Details';
import RevokeInvoiceDetails from '../RevokeInvoiceDetails/Details';
import SezApprovalDetails from '../SezApprovalDetails/Details';
import TdsApprovalDetails from '../TdsApprovalDetails/Details';

export const TYPE_COMPONENT_MAPPING = {
	BANK_DETAIL_APPROVAL            : BankAccountDetails,
	TDS_APPROVAL                    : TdsApprovalDetails,
	RECURRING_EXPENSE_APPROVAL      : RecuringDetails,
	OVERHEAD_APPROVAL               : NonRecuring,
	SEZ_APPROVAL                    : SezApprovalDetails,
	CONCOR_PDA_APPROVAL             : ConcorDetails,
	REVOKE_INVOICE                  : RevokeInvoiceDetails,
	ADVANCE_SECURITY_DEPOSIT        : AdvanceSecurityDeposit,
	ADVANCE_SECURITY_DEPOSIT_REFUND : AdvanceSecurityDepositRefund,
	ISSUE_CREDIT_NOTE               : RequestCNDetails,
	JOB_OPEN                        : JobOpenDetailsModal,
	CONSOLIDATED_CREDIT_NOTE        : RequestCNDetails,
	PAYMENT_CONFIRMATION_APPROVAL   : PaymentDetails,
	SAAS                            : PaymentApproval,
};

export const HEADER_MAPPING = {
	BANK_DETAIL_APPROVAL            : 'Bank Account Add/Edit',
	TDS_APPROVAL                    : 'TDS Deviation',
	RECURRING_EXPENSE_APPROVAL      : 'Expense Configuration Approval',
	OVERHEAD_APPROVAL               : 'Expense Approval',
	SEZ_APPROVAL                    : 'SEZ Approval',
	CONCOR_PDA_APPROVAL             : 'PDA Approval',
	REVOKE_INVOICE                  : 'Revoke Invoice',
	ADVANCE_SECURITY_DEPOSIT        : 'Advance Container Security Deposit',
	ADVANCE_SECURITY_DEPOSIT_REFUND : 'Advance Container Security Deposit Refund',
	ISSUE_CREDIT_NOTE               : 'Request Credit Note',
	JOB_OPEN                        : 'Job Open',
	CONSOLIDATED_CREDIT_NOTE        : 'Request Consolidated Credit Note',
	PAYMENT_CONFIRMATION_APPROVAL   : 'Payment Confirmation Approval',
	SAAS                            : 'Payment/Subscription Approval',
};

export const REQUEST_MAPPING = {
	BANK_DETAIL_APPROVAL            : 'bankRequest',
	TDS_APPROVAL                    : 'tdsRequest',
	RECURRING_EXPENSE_APPROVAL      : 'reccuringExpenseApproval',
	OVERHEAD_APPROVAL               : 'overheadConfirmationRequest',
	SEZ_APPROVAL                    : 'sezRequest',
	CONCOR_PDA_APPROVAL             : 'concorPdaApprovalRequest',
	REVOKE_INVOICE                  : 'revokeInvoiceRequest',
	ADVANCE_SECURITY_DEPOSIT        : 'advanceSecurityDeposit',
	ADVANCE_SECURITY_DEPOSIT_REFUND : 'advanceSecurityDepositRefund',
	ISSUE_CREDIT_NOTE               : 'creditNoteRequest',
	JOB_OPEN                        : 'jobOpenRequest',
	CONSOLIDATED_CREDIT_NOTE        : 'consolidatedCreditNoteRequest',
	PAYMENT_CONFIRMATION_APPROVAL   : 'paymentConfirmationRequest',
	SAAS                            : 'PaymentApproval',
};

export const DOCUMENT_MAPPING = {
	BANK_DETAIL_APPROVAL            : 'documentUrls',
	TDS_APPROVAL                    : 'documentUrls',
	RECURRING_EXPENSE_APPROVAL      : 'proofDocuments',
	OVERHEAD_APPROVAL               : 'documents',
	SEZ_APPROVAL                    : 'documentUrls',
	CONCOR_PDA_APPROVAL             : 'bookingProof',
	REVOKE_INVOICE                  : 'documentUrls',
	ADVANCE_SECURITY_DEPOSIT        : 'documentUrls',
	ADVANCE_SECURITY_DEPOSIT_REFUND : 'uploadProof',
	ISSUE_CREDIT_NOTE               : 'documentUrls',
	JOB_OPEN                        : 'documentUrls',
	CONSOLIDATED_CREDIT_NOTE        : 'documentUrls',
	PAYMENT_CONFIRMATION_APPROVAL   : 'documentUrls',
};
