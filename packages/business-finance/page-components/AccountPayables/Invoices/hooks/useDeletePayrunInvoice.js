import { Toast } from '@cogoport/components';
import { useRequestBf } from '@cogoport/request';
import { useSelector } from '@cogoport/store';

import toastApiError from '../../../commons/toastApiError.ts';

const API_ARRAY_VARIABLE_ONE = 1;

const useDeletePayrunInvoice = ({ generateInvoice = () => {} }) => {
	const {
		performedBy = '',
		performedByType = '',
		performedByName = '',
	} = useSelector(({ general, profile }) => ({
		query           : general.query,
		performedBy     : profile.user.id,
		performedByType : profile.session_type,
		performedByName : profile.user.name,
	}));

	const delete_payrun_invoice = useRequestBf(
		{
			url     : '/purchase/payrun-bill',
			method  : 'delete',
			authKey : 'delete_purchase_payrun_bill',
		},
		{ manual: false },
	);

	const deleteInvoices = async (id = '') => {
		try {
			await delete_payrun_invoice[API_ARRAY_VARIABLE_ONE]({
				data: {
					id,
					performedBy,
					performedByType,
					performedByName,
				},
			});

			Toast.success('Invoice deleted successfully');
			generateInvoice();
		} catch (e) {
			toastApiError(e);
		}
	};

	return {
		deleteInvoices,
	};
};

export default useDeletePayrunInvoice;
