import { Toast } from '@cogoport/components';
import { useRequestBf } from '@cogoport/request';
import { useSelector } from '@cogoport/store';

interface Profile {
	profile?: { user: { id: string } };
}
interface Props {
	refetch?: Function;
	setShowDeleteConfirmationModal?: React.Dispatch<React.SetStateAction<boolean>>;
}
const useDeleteHistorySettlement = ({ refetch = () => {}, setShowDeleteConfirmationModal = () => {} }:Props) => {
	const { profile }:Profile = useSelector((state) => state || {});

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
