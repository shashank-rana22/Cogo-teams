import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useHarbourRequest } from '@cogoport/request';

const useCreateChapter = ({ fetchList, setShowSubChapterModal }) => {
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
			Toast.success('Subchapter has been created successfully');

			setShowSubChapterModal(false);
			fetchList();
		} catch (err) {
			Toast.error(getApiErrorString(err?.response?.data) || 'Something went wrong');
		}
	};

	return {
		onClickSubmitButton,
		loading,
	};
};

export default useCreateChapter;
