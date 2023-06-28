import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useHarbourRequest } from '@cogoport/request';

const useDeleteTribe = ({ fetchList, setShowDeleteModal, showDeleteModal }) => {
	const [{ loading }, trigger] = useHarbourRequest(
		{
			method : 'DELETE',
			url    : '/delete_tribe',
		},
		{ manual: true },
	);

	const deleteTribe = async () => {
		const payload = {
			tribe_id: showDeleteModal,
		};
		try {
			await trigger({
				data: payload,
			});
			Toast.success('Tribe has been deleted successfully');
			setShowDeleteModal(false);
			fetchList();
		} catch (error) {
			Toast.error(getApiErrorString(error.response?.data));
		}
	};

	return {
		deleteTribe,
		loading,
	};
};

export default useDeleteTribe;
