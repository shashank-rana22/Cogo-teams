import { Toast } from '@cogoport/components';

export const getSelectedInvoices = ({ list = [] }) => {
	const SELECTED_INVOICES = [];

	(list || []).forEach((addToSelectdata) => {
		const {
			tdsAmount = 0,
			checked = false,
			id = '',
			inputAmount = 0,
			bankDetail = undefined,
			invoiceNumber = ' ',
			invoiceType,
		} = addToSelectdata || {};

		if (checked) {
			if (!bankDetail) {
				Toast.error(
					`Select Bank for Invoice Number ${invoiceNumber}`,
				);
				return;
			}

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
			SELECTED_INVOICES.push({
				billId        : id,
				tdsAmount     : +tdsAmount,
				payableAmount : +inputAmount,
				bankDetail    : formattedBank,
				invoiceType,
			});
		}
	});
	return SELECTED_INVOICES;
};
