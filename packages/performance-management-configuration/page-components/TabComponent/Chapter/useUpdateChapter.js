import { Toast } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useHarbourRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';

const useUpdateChapter = ({ fetchList, setShowUpdateChapterModal, showUpdateChapterModal }) => {
	const { profile = {} } = useSelector((state) => state);

	const { user = {} } = profile;

	const { id: user_id } = user;
	const { control, formState: { errors }, handleSubmit, setValue } = useForm();

	const [{ loading }, trigger] = useHarbourRequest({
		method : 'post',
		url    : '/update_chapter',
	}, { manual: true });

	const onClickUpdateButton = async (values) => {
		const { sub_chapter_ids, ...rest } = values;
		const ARRAY_OF_IDS = showUpdateChapterModal.sub_chapters.map((obj) => obj.id);

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
					chapter_id        : showUpdateChapterModal?.id,
					performed_by_id   : user_id,
					performed_by_type : 'user',
					sub_chapters_added,
					sub_chapters_removed,
				},
			});
			Toast.success('Successfully Updated');
			setShowUpdateChapterModal(false);
			fetchList();
		} catch (err) {
			Toast.error(getApiErrorString(err?.response?.data) || 'Something went wrong');
		}
	};

	return {
		control,
		errors,
		onClickUpdateButton,
		loading,
		handleSubmit,
		setValue,
	};
};

export default useUpdateChapter;
