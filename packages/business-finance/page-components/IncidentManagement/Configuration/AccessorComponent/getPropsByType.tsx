function getPropsByType(type, data) {
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
	} = data || {};

	switch (type) {
		case 'TDS_APPROVAL':
			return { tdsData: tdsRequest };
		case 'BANK_DETAIL_APPROVAL':
			return { bankData: bankRequest };
		case 'SETTLEMENT_APPROVAL':
			return { settlementData: settlementRequest };
		case 'ISSUE_CREDIT_NOTE':
			return {};
		case 'JOURNAL_VOUCHER_APPROVAL':
			return { journalVoucherRequest };
		case 'INTER_COMPANY_JOURNAL_VOUCHER_APPROVAL':
			return { interCompanyJournalVoucherRequest };
		case 'CONCOR_PDA_APPROVAL':
			return { concorData: concorPdaApprovalRequest };
		case 'SEZ_APPROVAL':
			return { sezRequest };
		case 'ADVANCE_SECURITY_DEPOSIT_REFUND':
			return { advanceSecurityDepositRefund };
		case 'PAYMENT_CONFIRMATION_APPROVAL':
			return { paymentConfirmationRequest };
		case 'ADVANCE_SECURITY_DEPOSIT':
			return { advanceSecurityDeposit };
		default:
			return {};
	}
}
export default getPropsByType;
