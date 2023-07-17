import { Toast } from '@cogoport/components';
import { useRequestBf } from '@cogoport/request';
import { useSelector } from '@cogoport/store';

const useDeleteInvoice = ({ overseasData = '', setShowDeleteInvoiceModal = () => {}, refetch = () => {} }) => {
	const { profile = {} } = useSelector((state) => state);
	const { user = {}, session_type = '' } = profile;
	const { id: user_id } = user;
	const [{ data:deleteInvoiceData, loading: deleteinvoiceLoading }, deleteinvoiceTrigger] = useRequestBf({
		url     : '/purchase/payrun-bill',
		method  : 'delete',
		authKey : 'delete_purchase_payrun_bill',
	}, { manual: true, autoCancel: false });

	const deleteInvoice = async (id) => {
		try {
			await deleteinvoiceTrigger({
				data: {
					id,
					performedBy     : user_id,
					performedByType : session_type,
					objectType:
                            overseasData === 'ADVANCE_PAYMENT' ? 'ADVANCE_DOCUMENT' : undefined,
				},
			});
			Toast.success(deleteInvoiceData?.message || 'Invoice Deleted Successfully');
			setShowDeleteInvoiceModal(false);
			refetch();
		} catch (e) {
			Toast.error(e?.response?.data?.message || 'Failed to delete Invoice');
		}
	};

	return {
		deleteinvoiceLoading,
		deleteInvoice,
	};
};

export default useDeleteInvoice;
