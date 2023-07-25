import { Toast } from '@cogoport/components';
import { useRequestBf } from '@cogoport/request';
import { useSelector } from '@cogoport/store';

const useDeletePayrun = ({ overseasData, setShowDeleteModal = () => {}, refetch = () => {} }) => {
	const { profile = {} } = useSelector((state) => state);
	const { user = {}, session_type = '' } = profile;
	const { id: user_id } = user;

	const [{ data: deletePayrunData, loading: deletePayrunLoading }, deletepayrunTrigger] = useRequestBf({
		url     : '/purchase/payrun',
		method  : 'delete',
		authKey : 'delete_purchase_payrun',
	}, { manual: true, autoCancel: false });

	const getDeletePayrunPayload = (id) => ({
		id,
		performedBy     : user_id,
		performedByType : session_type,
		payrunType:
				overseasData === 'ADVANCE_PAYMENT' ? 'ADVANCE_PAYMENT' : undefined,
	});

	const deletePayrun = async (id) => {
		const getPayload = getDeletePayrunPayload(id);

		try {
			await deletepayrunTrigger({
				data: getPayload,
			});
			refetch();
			Toast.success(deletePayrunData?.message || 'Payrun deleted successfully');
			setShowDeleteModal(false);
		} catch (e) {
			Toast.error(e?.response?.data?.message || 'Failed to Delete Payrun');
		}
	};
	return {
		deletePayrun,
		deletePayrunLoading,
	};
};

export default useDeletePayrun;
