import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useHarbourRequest } from '@cogoport/request';

const useDeleteSubChapter = ({ fetchList, setShowDeleteModal, showDeleteModal }) => {
	const [{ loading }, trigger] = useHarbourRequest(
		{
			method : 'DELETE',
			url    : '/delete_sub_chapter',
		},
		{ manual: true },
	);

	const deleteSubChapter = async () => {
		const payload = {
			sub_chapter_id: showDeleteModal,
		};
		try {
			await trigger({
				data: payload,
			});
			Toast.success('Subchapter has been deleted successfully');

			setShowDeleteModal(false);
			fetchList();
		} catch (error) {
			Toast.error(getApiErrorString(error.response?.data));
		}
	};

	return {
		deleteSubChapter,
		loading,
	};
};

export default useDeleteSubChapter;
