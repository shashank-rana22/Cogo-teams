import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useHarbourRequest } from '@cogoport/request';

const useDeleteChapter = ({ fetchList, setShowDeleteModal, showDeleteModal }) => {
	const [{ loading }, trigger] = useHarbourRequest(
		{
			method : 'DELETE',
			url    : '/delete_chapter',
		},
		{ manual: true },
	);

	const deleteChapter = async () => {
		const payload = {
			chapter_id: showDeleteModal,
		};
		try {
			await trigger({
				data: payload,
			});
			Toast.success('Chapter has been deleted successfully');
			setShowDeleteModal(false);
			fetchList();
		} catch (error) {
			Toast.error(getApiErrorString(error.response?.data));
		}
	};

	return {
		deleteChapter,
		loading,
	};
};

export default useDeleteChapter;
