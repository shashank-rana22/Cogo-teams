import { Toast } from '@cogoport/components';
import { useRequestBf } from '@cogoport/request';
import { useSelector } from '@cogoport/store';

const useDeleteHistorySettlement = ({ refetch = () => {}, setShowDeleteConfirmationModal = () => {} }) => {
	const { profile } = useSelector((state) => state || {});

	const [{ loading: deleteHistoryLoading }, deleteHistoryTriggerApi] = useRequestBf(
		{
			url     : '/payments/settlement',
			method  : 'delete',
			authKey : 'delete_payments_settlement',

		},
		{ manual: true },
	);
	const deleteHistory = async ({ item }) => {
		const { documentNo, accountType } = item || {};
		try {
			await deleteHistoryTriggerApi({
				params: {
					documentNo,
					settlementType : accountType,
					deletedBy      : profile?.user?.id,
				},
				data: {},
			});

			Toast.success('Deleted Successfully');
			refetch();
		} catch (error) {
			Toast.error(error?.response?.data?.message);
		}
		setShowDeleteConfirmationModal(false);
	};

	return {
		deleteHistory,
		deleteHistoryLoading,
	};
};

export default useDeleteHistorySettlement;
