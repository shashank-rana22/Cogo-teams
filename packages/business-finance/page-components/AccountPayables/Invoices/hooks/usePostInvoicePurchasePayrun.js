import { Toast } from '@cogoport/components';
import { useRequestBf } from '@cogoport/request';
import { useSelector } from '@cogoport/store';

import toastApiError from '../../../commons/toastApiError';
import getSelectedInvoice from '../utils/getSelectedInvoice';

const usePostInvoicePurchasePayrun = ({ refetch = () => {}, apiData = {} }) => {
	const {
		query: urlQuery = {},
		performedBy = '', performedByType = '', performedByName = '',
	} = useSelector(({ general, profile }) => ({
		query           : general?.query,
		performedBy     : profile?.user.id,
		performedByType : profile?.session_type,
		performedByName : profile?.user?.name,
	}));

	const [{ loading }, trigger] = useRequestBf(
		{
			url     : '/purchase/payrun',
			method  : 'post',
			authKey : 'post_purchase_payrun',
		},
		{ manual: true },
	);

	const onSubmitSelectedInvoices = async () => {
		const { list = [] } = apiData ?? {};
		const SELECTED_INVOICE = getSelectedInvoice({ list });

		try {
			const res = await trigger({
				data: {
					list       : [...SELECTED_INVOICE],
					id         : urlQuery?.payrun,
					entityCode : urlQuery?.entity,
					currency   : urlQuery?.currency,
					performedBy,
					performedByType,
					performedByName,
				},
			});
			if (res?.data?.message) {
				toastApiError(res.data.message);
			} else { Toast.success('Invoice added to Payrun Successfully'); refetch(); }
		} catch (e) { toastApiError(e); }
		return null;
	};

	return {
		createloading: loading,
		onSubmitSelectedInvoices,
	};
};

export default usePostInvoicePurchasePayrun;
