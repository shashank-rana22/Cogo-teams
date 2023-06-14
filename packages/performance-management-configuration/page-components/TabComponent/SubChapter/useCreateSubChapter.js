import { Toast } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useHarbourRequest } from '@cogoport/request';
import { useState } from 'react';

const useCreateChapter = () => {
	const [showAddChapterModal, setShowAddChapterModal] = useState(false);

	const { control, formState: { errors }, handleSubmit } = useForm();

	const [{ loading }, trigger] = useHarbourRequest({
		method : 'post',
		url    : '/create_sub_chapter',
	}, { manual: true });

	const onClickSubmitButton = async (values) => {
		try {
			await trigger({
				data: {
					...values,
				},
			});
			setShowAddChapterModal(false);
		} catch (err) {
			Toast.error(getApiErrorString(err?.response?.data) || 'Something went wrong');
		}
	};

	return {
		showAddChapterModal,
		setShowAddChapterModal,
		control,
		errors,
		onClickSubmitButton,
		loading,
		handleSubmit,
	};
};

export default useCreateChapter;
