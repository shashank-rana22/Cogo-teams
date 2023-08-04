function getPropsByType({ type, data, referenceId }) {
	const {
		tdsRequest,
		bankRequest,
		settlementRequest,
		journalVoucherRequest,
		interCompanyJournalVoucherRequest,
		concorPdaApprovalRequest,
		sezRequest,
		paymentConfirmationRequest,
		advanceSecurityDeposit,
		advanceSecurityDepositRefund,
		revokeInvoiceRequest,
	} = data || {};

	const typeMappings = {
		TDS_APPROVAL                           : { tdsData: tdsRequest },
		BANK_DETAIL_APPROVAL                   : { bankData: bankRequest },
		SETTLEMENT_APPROVAL                    : { settlementData: settlementRequest },
		ISSUE_CREDIT_NOTE                      : {},
		JOURNAL_VOUCHER_APPROVAL               : { journalVoucherRequest },
		INTER_COMPANY_JOURNAL_VOUCHER_APPROVAL : { interCompanyJournalVoucherRequest },
		CONCOR_PDA_APPROVAL                    : { concorData: concorPdaApprovalRequest, referenceId },
		SEZ_APPROVAL                           : { sezRequest },
		ADVANCE_SECURITY_DEPOSIT_REFUND        : { advanceSecurityDepositRefund },
		PAYMENT_CONFIRMATION_APPROVAL          : { paymentConfirmationRequest },
		ADVANCE_SECURITY_DEPOSIT               : { advanceSecurityDeposit },
		CONSOLIDATED_CREDIT_NOTE               : {},
		REVOKE_INVOICE                         : { revokeInvoiceData: revokeInvoiceRequest },
	};

	return typeMappings[type] || {};
}
export default getPropsByType;
