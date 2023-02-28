import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useAllocationRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';

const useSubmitResponses = (props) => {
	const {
		profile = {},
	} = useSelector((state) => state);
	const { responseData = [], setResponseData = () => {} } = props;

	const [{ loading }, trigger] = useAllocationRequest({
		url     : '/feedback_response',
		method  : 'POST',
		authkey : 'post_allocation_feedback_response',
	}, { manual: true });

	const handleResponseSubmit = async () => {
		const payload = {

			response_type       : 'user',
			source              : 'manual',
			feedback_request_id : responseData[0].feedback_request_id,
			name                : responseData[0].name,
			email               : responseData[0].email,
			mobile_number       : responseData[0].mobile_number,
			performed_by_type   : 'agent',
			performed_by_id     : profile.user?.id,

		};

		try {
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
