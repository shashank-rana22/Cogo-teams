import { Toast } from '@cogoport/components';
import { useAllocationRequest } from '@cogoport/request';

const useUpdateStatus = ({
	uploadProof,
	setEnrichmentItem = () => {},
	enrichmentItem = {},
	refetch = () => {},
}) => {
	const api = useAllocationRequest({
		url     : '/feedback_response_sheet',
		method  : 'post',
		authKey : 'post_allocation_feedback_response_sheet',
	}, { manual: true });

	const [{ loading }, trigger] = api;

	const { id = '' } = enrichmentItem;

	const uploadDoc = async (formValues = {}) => {
		try {
			await trigger({
				data: {
					sheet_url           : uploadProof,
					feedback_request_id : id,
					file_name           : formValues.file_name,
				},
			});
			Toast.success('Uploaded successful');
			refetch();
			setEnrichmentItem(null);
		} catch (err) {
			Toast.error(err?.error?.message || 'Something went wrong');
		}
	};

	return {
		uploadDoc,
		loading,
	};
};

export default useUpdateStatus;
