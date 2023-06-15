import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useHarbourRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';

const useDeleteChapter = ({ fetchList, setDeleteShowModal, showDeleteModal }) => {
	const { profile = {} } = useSelector((state) => state);

	const { user = {} } = profile;

	const { id: user_id } = user;

	const [{ loading }, trigger] = useHarbourRequest(
		{
			method : 'DELETE',
			url    : '/delete_chapter',
		},
		{ manual: true },
	);

	const deleteChapter = async () => {
		const payload = {
			chapter_id        : showDeleteModal,
			performed_by_id   : user_id,
			performed_by_type : 'user',
		};
		try {
			await trigger({
				data: payload,
			});
			Toast.success('Successfully Deleted');
			setDeleteShowModal(false);
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
