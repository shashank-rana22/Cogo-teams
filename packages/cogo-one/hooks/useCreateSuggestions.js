import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';

function useCreateSuggestions({ reset = () => {}, refetch = () => {} }) {
	const [{ loading }, trigger] = useRequest({
		url    : '/create_suggestion',
		method : 'post',
	}, { manual: true });

	const createSuggestion = async (data = {}) => {
		try {
			await trigger({
				data: {
					...(data || {}),
					suggestion_type: 'quick_reply',
				},
			});
			reset({});
			refetch();
			Toast.success('Successfully Created');
		} catch (error) {
			Toast.error(getApiErrorString(error?.response?.data));
		}
	};
	return {
		createSuggestion,
		loading,
	};
}
export default useCreateSuggestions;
