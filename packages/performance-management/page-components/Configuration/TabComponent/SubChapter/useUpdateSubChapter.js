import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useHarbourRequest } from '@cogoport/request';

const useUpdateSubChapter = ({ fetchList, setShowSubChapterModal, showSubChapterModal }) => {
	const [{ loading }, trigger] = useHarbourRequest({
		method : 'post',
		url    : '/update_sub_chapter',
	}, { manual: true });

	const onClickUpdateButton = async (values) => {
		const { employee_ids, ...rest } = values;
		const ARRAY_OF_IDS = showSubChapterModal.employees.map((obj) => obj?.id);

		const employees_added = (employee_ids || []).filter(
			(id) => !(ARRAY_OF_IDS || []).includes(id),
		);

		const employees_removed = (ARRAY_OF_IDS || []).filter(
			(id) => !(employee_ids || []).includes(id),
		);
		try {
			await trigger({
				data: {
					...rest,
					sub_chapter_id: showSubChapterModal?.id,
					employees_added,
					employees_removed,
				},
			});
			Toast.success('Subchapter has been updated successfully');
			setShowSubChapterModal(false);
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

export default useUpdateSubChapter;
