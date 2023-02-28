import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRouter } from '@cogoport/next';
import { useAllocationRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';

const useSubmitResponses = (props) => {
	const {
		profile = {},
	} = useSelector((state) => state);

	const router = useRouter();
	const { query = {} } = router;
	const { responseData = [], setResponseData = () => {} } = props;

	const [{ loading }, trigger] = useAllocationRequest({
		url     : '/feedback_response',
		method  : 'POST',
		authkey : 'post_allocation_feedback_response',
	}, { manual: true });

	const handleResponseSubmit = async () => {
		try {
			await trigger({
				data: {
					...responseData,
					response_type       : 'user',
					source              : 'manual',
					feedback_request_id : query?.id,
					/// testing
					performed_by_type   : 'agent',
					performed_by_id     : profile.user?.id,

				},
			});

			setResponseData([]);

			Toast.success('Response Submitted Successfully');
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
