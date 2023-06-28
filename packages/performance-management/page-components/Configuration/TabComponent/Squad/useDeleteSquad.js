import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useHarbourRequest } from '@cogoport/request';

const useDeleteSquad = ({ fetchList, setShowDeleteModal, showDeleteModal }) => {
	const [{ loading }, trigger] = useHarbourRequest(
		{
			method : 'DELETE',
			url    : '/delete_squad',
		},
		{ manual: true },
	);

	const deleteSquad = async () => {
		const payload = {
			squad_id: showDeleteModal,
		};
		try {
			await trigger({
				data: payload,
			});
			Toast.success('Squad has been deleted successfully');
			setShowDeleteModal(false);
			fetchList();
		} catch (error) {
			Toast.error(getApiErrorString(error.response?.data));
		}
	};

	return {
		deleteSquad,
		loading,
	};
};

export default useDeleteSquad;
