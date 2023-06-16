import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useHarbourRequest } from '@cogoport/request';
import { useState } from 'react';

const useCreateChapter = ({ fetchList }) => {
	const [showAddChapterModal, setShowAddChapterModal] = useState(false);

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
			Toast.success('Successfully Created');

			setShowAddChapterModal(false);
			fetchList();
		} catch (err) {
			Toast.error(getApiErrorString(err?.response?.data) || 'Something went wrong');
		}
	};

	return {
		showAddChapterModal,
		setShowAddChapterModal,
		onClickSubmitButton,
		loading,
	};
};

export default useCreateChapter;
