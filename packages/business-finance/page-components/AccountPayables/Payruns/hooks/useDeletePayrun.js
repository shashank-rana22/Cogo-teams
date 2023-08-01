import { Toast } from '@cogoport/components';
import { useRequestBf } from '@cogoport/request';
import { useSelector } from '@cogoport/store';

const getDeletePayrunPayload = ({ id, user_id, session_type, overseasData }) => ({
	id,
	performedBy     : user_id,
	performedByType : session_type,
	payrunType:
			overseasData === 'ADVANCE_PAYMENT' ? 'ADVANCE_PAYMENT' : undefined,
});

const useDeletePayrun = ({ overseasData, setShowDeleteModal = () => {}, refetch = () => {} }) => {
	const { profile = {} } = useSelector((state) => state);
	const { user = {}, session_type = '' } = profile;
	const { id: user_id } = user;

	const [{ data, loading }, deletepayrunTrigger] = useRequestBf({
		url     : '/purchase/payrun',
		method  : 'delete',
		authKey : 'delete_purchase_payrun',
	}, { manual: true, autoCancel: false });

	const deletePayrun = async (id) => {
		const payload = getDeletePayrunPayload({ id, user_id, session_type, overseasData });

		try {
			await deletepayrunTrigger({
				data: payload,
			});
			refetch();
			Toast.success(data?.message || 'Payrun deleted successfully');
			setShowDeleteModal(false);
		} catch (e) {
			Toast.error(e?.response?.data?.message || 'Failed to Delete Payrun');
		}
	};
	return {
		deletePayrun,
		deletePayrunLoading: loading,
	};
};

export default useDeletePayrun;
