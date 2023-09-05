const getPaymentAccountsPayload = ({
	exchangeRateApiData = '',
	billingParty = {},
	updateRefundModal = {},
	formValues = {},
}) => {
	const {
		advanceDocumentSellerAddress = {},
		advanceDocumentSellerBankDetail = {},
		advanceDocumentId = '',
	} = updateRefundModal || {};

	const { accountNumber = '', bankName = '' } = advanceDocumentSellerBankDetail || {};
	const { tradePartyMappingId = '', entityCode = '' } = advanceDocumentSellerAddress || {};
	const { ledger_currency = '', id = '' } = billingParty || {};

	const {
		amount = '',
		currency = '',
		payment_mode = '',
		utr_number = '',
		upload = null,
		date = '',
		remarks = '',
	} = formValues || {};

	return {
		entityType        : entityCode,
		paymentDate       : date,
		currency,
		ledCurrency       : ledger_currency,
		amount            : (amount && exchangeRateApiData) ? amount * exchangeRateApiData : '',
		exchangeRate      : exchangeRateApiData,
		payMode           : payment_mode,
		remarks,
		utr               : utr_number,
		accMode           : 'AP',
		bankAccountNumber : accountNumber,
		bankName,
		bankId            : id,
		tradePartyMappingId,
		advanceDocumentId,
		paymentDocUrl     : upload?.finalUrl || upload,
	};
};

export default getPaymentAccountsPayload;
