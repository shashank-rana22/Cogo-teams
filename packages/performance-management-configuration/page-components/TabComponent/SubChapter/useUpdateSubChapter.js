import { Toast } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useHarbourRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';

const useUpdateSubChapter = ({ fetchList, setShowUpdateSubChapterModal, showUpdateSubChapterModal }) => {
	const { profile = {} } = useSelector((state) => state);

	const { user = {} } = profile;

	const { id: user_id } = user;
	const { control, formState: { errors }, handleSubmit, setValue } = useForm();

	const [{ loading }, trigger] = useHarbourRequest({
		method : 'post',
		url    : '/update_sub_chapter',
	}, { manual: true });

	const onClickUpdateButton = async (values) => {
		const { employee_ids, ...rest } = values;
		const ARRAY_OF_IDS = showUpdateSubChapterModal.employees.map((obj) => obj.id);

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
					sub_chapter_id    : showUpdateSubChapterModal?.id,
					performed_by_id   : user_id,
					performed_by_type : 'user',
					employees_added,
					employees_removed,
				},
			});
			Toast.success('Successfully Updated');
			setShowUpdateSubChapterModal(false);
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

export default useUpdateSubChapter;
