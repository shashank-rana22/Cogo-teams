import toastApiError from '../../../commons/toastApiError';

const INCREEMENT_BY = 1;

const getSelectedInvoice = ({ list = [] }) => {
	const SELECTED_INVOICE = [];

	for (let i = 0; i < list.length; i += INCREEMENT_BY) {
		const data = list?.[i];

		const {
			tdsAmount = 0,
			checked = false,
			id = '',
			bankDetail = undefined,
			invoiceNumber = ' ',
			inputAmount = 0,
			invoiceType,
		} = data || {};

		if (checked) {
			if (!bankDetail) { return toastApiError(`Select Bank for Invoice Number ${invoiceNumber}`); }

			const {
				bank_account_number = '',
				accountNo = '',
				bankName = '',
				branchName = '',
				ifscCode = '',
				ifsc_number = '',
				branch_name = '',
				bank_name = '',
				imageUrl = '',
				bankId,
				beneficiaryName,
			} = bankDetail || {};

			const formattedBank = {
				bankName        : bank_name || bankName,
				branchName      : branch_name || branchName,
				ifscCode        : ifsc_number || ifscCode,
				accountNo       : bank_account_number || accountNo,
				beneficiaryName : beneficiaryName || undefined,
				imageUrl,
				bankId,
			};

			SELECTED_INVOICE.push({
				billId        : id,
				tdsAmount     : +tdsAmount,
				payableAmount : +inputAmount,
				bankDetail    : formattedBank,
				invoiceType,
			});
		}
	}

	return SELECTED_INVOICE;
};

export default getSelectedInvoice;
