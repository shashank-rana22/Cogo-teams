import { Toast } from '@cogoport/components';
import { useRequestBf } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { isEmpty } from '@cogoport/utils';

import toastApiError from '../../../commons/toastApiError.ts';

const getSelectedInvoices = ({ list }) => {
	const SELECTED_INVOICES = [];

	list.forEach((addToSelectdata) => {
		const {
			tdsAmount = 0,
			checked = false,
			id = '',
			bankDetail = undefined,
			invoiceNumber = ' ',
			payableAmount = 0,
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
				payableAmount : +payableAmount,
				bankDetail    : formattedBank,
				invoiceType,
			});
		}
	});
	return SELECTED_INVOICES;
};

const usePostAddToSelected = ({ getPayrunInvoices, apiData }) => {
	const { user_data: userData, query: urlQuery } = useSelector(({ profile, general }) => ({
		user_data: profile || {}, query: general.query,
	}));
	const { user, session_type: sessionType } = userData;
	const { id: userId = '', name } = user || {};

	const {
		entity = '',
		currency,
		payrun = '',
	} = urlQuery || {};
	const [{ loading },
		addToSelectedTrigger,
	] = useRequestBf(
		{
			url     : '/purchase/payrun',
			method  : 'post',
			authKey : 'post_purchase_payrun',
		},
		{ manual: true },
	);

	const submitSelectedInvoices = async () => {
		const { list = [] } = apiData || {};
		const invoices = getSelectedInvoices({ list });

		try {
			if (!isEmpty(invoices)) {
				await addToSelectedTrigger({
					data: {
						list            : [...invoices],
						id              : payrun,
						entityCode      : entity,
						currencyCode    : currency,
						performedBy     : userId,
						performedByType : sessionType,
						performedByName : name,
					},
				});
				Toast.success('Invoice added to Payrun Successfully');
				getPayrunInvoices();
			}
		} catch (e) {
			toastApiError(e);
		}
		return null;
	};
	return { submitSelectedInvoices, loading };
};

export default usePostAddToSelected;
