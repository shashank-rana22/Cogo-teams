import { Toast } from '@cogoport/components';
import { useAllocationRequest } from '@cogoport/request';
import { isEmpty } from '@cogoport/utils';

const useUpdateStatus = (props) => {
	const {
		setShowUpload,
		uploadProof,
		refetch,
	} = props;

	const api = useAllocationRequest({
		url     : '/feedback_response_sheet',
		method  : 'post',
		authkey : 'post_allocation_feedback_response_sheet',
	}, { manual: true });

	const [{ loading }, trigger] = api;

	const uploadDoc = async (formValues) => {
		try {
			await trigger({
				data: {
					sheet_url : uploadProof,
					file_name : formValues.file_name,
				},
			});
			Toast.success('Uploaded successful');
			setShowUpload(false);
			refetch();
		} catch (err) {
			Toast.error(err?.error?.message || 'Something went wrong');
		}
	};

	const handleManualUpload = (formValues) => {
		if (!isEmpty(uploadProof)) {
			uploadDoc(formValues);
		} else {
			Toast.error('Enrichment doc is required');
		}
	};

	return {
		uploadDoc,
		loading,
		handleManualUpload,
	};
};

export default useUpdateStatus;
