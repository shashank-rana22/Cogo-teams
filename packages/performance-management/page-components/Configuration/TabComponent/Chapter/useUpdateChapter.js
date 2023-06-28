import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useHarbourRequest } from '@cogoport/request';

const useUpdateChapter = ({ fetchList, setShowChapterModal, showChapterModal }) => {
	const [{ loading }, trigger] = useHarbourRequest({
		method : 'post',
		url    : '/update_chapter',
	}, { manual: true });

	const onClickUpdateButton = async (values) => {
		const { sub_chapter_ids, ...rest } = values;
		const ARRAY_OF_IDS = showChapterModal.sub_chapters.map((obj) => obj?.id);

		const sub_chapters_added = (sub_chapter_ids || []).filter(
			(id) => !(ARRAY_OF_IDS || []).includes(id),
		);
		const sub_chapters_removed = (ARRAY_OF_IDS || []).filter(
			(id) => !(sub_chapter_ids || []).includes(id),
		);

		try {
			await trigger({
				data: {
					...rest,
					chapter_id: showChapterModal?.id,
					sub_chapters_added,
					sub_chapters_removed,
				},
			});
			Toast.success('Chapter has been updated successfully');
			setShowChapterModal(false);
			fetchList();
		} catch (err) {
			Toast.error(getApiErrorString(err?.response?.data) || 'Something went wrong');
		}
	};

	return {
		onClickUpdateButton,
		loading,
	};
};

export default useUpdateChapter;
