import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';

const useUpdateChapterSequenceOrder = ({ setGetSubModuleRefetch }) => {
	const [{ loading }, trigger] = useRequest({
		url    : '/update_chapter_sequence_order',
		method : 'POST',
	}, { manual: true });

	const updateChapterSequenceOrder = async ({ values }) => {
		try {
			await trigger({ data: values });

			setGetSubModuleRefetch(true);
		} catch (error) {
			Toast.error(getApiErrorString(error.response?.data));
		}
	};

	return {
		updateChapterSequenceOrder,
		loading,
	};
};

export default useUpdateChapterSequenceOrder;
