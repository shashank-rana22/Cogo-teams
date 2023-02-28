import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useAllocationRequest } from '@cogoport/request';

const useSubmitResponses = (props) => {
	const { responseData = {}, setResponseData = () => {} } = props;

	const [{ loading }, trigger] = useAllocationRequest({
		url     : '/feedback_response',
		method  : 'POST',
		authkey : 'post_allocation_feedback_response',
	}, { manual: true });

	const handleResponseSubmit = async () => {
		try {
			const payload = {
				...responseData,
			};

			await trigger({
				data: payload,
			});

			setResponseData([]);

			Toast.success('successfully');
		} catch (error) {
			Toast.error(getApiErrorString(error.response?.data));
		}
	};

	return {
		handleResponseSubmit,
		loading,
	};
};

export default useSubmitResponses;
