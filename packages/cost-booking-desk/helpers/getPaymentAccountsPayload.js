const getPaymentAccountsPayload = ({
	exchangeRateApiData = 0,
	billingParty = {},
	updateRefundModal: { data = {} } = {},
	formValues = {},
	user_id = '',
}) => {
	const {
		advanceDocumentSellerAddress = {},
		advanceDocumentSellerBankDetail = {},
		advanceDocumentId = '',
		shipmentType = '',
		jobNumber = '',
		serviceProvider = '',
	} = data || {};

	const { accountNumber = '', bankName = '' } = advanceDocumentSellerBankDetail || {};
	const { tradePartyMappingId = '', entityCode = '' } = advanceDocumentSellerAddress || {};
	const { ledger_currency = '', id = '' } = billingParty || {};

	const {
		amount = 0,
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
		amount,
		exchangeRate      : exchangeRateApiData,
		payMode           : payment_mode,
		remarks,
		utr               : utr_number,
		accMode           : 'CSD',
		bankAccountNumber : accountNumber,
		bankName,
		bankId            : id,
		tradePartyMappingId,
		advanceDocumentId,
		jobNumber,
		serviceProvider,
		paymentDocUrl     : upload?.finalUrl || upload,
		serviceType       : shipmentType?.toUpperCase(),
		createdBy         : user_id,
		updatedBy         : user_id,
	};
};

export default getPaymentAccountsPayload;
