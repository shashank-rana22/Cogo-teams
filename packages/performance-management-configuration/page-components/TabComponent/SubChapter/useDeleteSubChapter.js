import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useHarbourRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';

const useDeleteSubChapter = ({ fetchList, setShowDeleteModal, showDeleteModal }) => {
	const { user = {} } = useSelector((state) => state.profile);
	const { id: user_id } = user;

	const [{ loading }, trigger] = useHarbourRequest(
		{
			method : 'DELETE',
			url    : '/delete_sub_chapter',
		},
		{ manual: true },
	);

	const deleteSubChapter = async () => {
		const payload = {
			sub_chapter_id    : showDeleteModal,
			performed_by_id   : user_id,
			performed_by_type : 'user',
		};
		try {
			await trigger({
				data: payload,
			});
			Toast.success('Successfully Deleted');

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
