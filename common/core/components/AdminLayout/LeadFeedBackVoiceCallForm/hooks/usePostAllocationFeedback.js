import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useAllocationRequest } from '@cogoport/request';

const getPayload = ({ leadOrgId = '', values }) => {
	const { feedback, other_feedback, feedback_reference_document_url } = values || {};

	return {
		feedback,
		lead_organization_id     : leadOrgId,
		source_type              : 'lead_organization',
		source_id                : leadOrgId,
		feedback_parameter       : 'account',
		feedback_parameter_value : '',
		other_feedback           : feedback === 'other' ? other_feedback : undefined,
		feedback_reference_document_url,
	};
};

function usePostAllocationFeedback({ leadOrgId = '', onCloseForm = () => {} }) {
	const [{ loading }, trigger] = useAllocationRequest({
		url     : '/feedback',
		method  : 'post',
		authkey : 'post_allocation_feedback',
	}, { manual: true });

	const postAllocationFeedback = async (values = {}) => {
		try {
			await trigger({
				data: getPayload({ leadOrgId, values }),
			});

			Toast.success('Successfully added the feedback');
			onCloseForm();
		} catch (error) {
			Toast.error(getApiErrorString(error?.response?.data));
		}
	};

	return {
		postAllocationFeedback,
		loading,
	};
}
export default usePostAllocationFeedback;
