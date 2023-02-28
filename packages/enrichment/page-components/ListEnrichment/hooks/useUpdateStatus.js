import { Toast } from '@cogoport/components';
import { useAllocationRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';

const useUpdateStatus = (props) => {
	const {
		profile = {},
	} = useSelector((state) => state);

	const {
		selectedItem,
		setSelectedItem,
		uploadProof,
		refetch,
	} = props;

	const api = useAllocationRequest({
		url     : '/feedback_response_sheet',
		method  : 'post',
		authkey : 'post_allocation_feedback_response_sheet',
	}, { manual: true });

	const [{ loading }, trigger] = api;

	const { id = '' } = selectedItem;

	const uploadDoc = async (formValues = {}) => {
		try {
			await trigger({
				data: {
					sheet_url           : uploadProof,
					feedback_request_id : id,
					file_name           : formValues.file_name,
					performed_by_type   : 'agent',
					performed_by_id     : profile.user?.id,
				},
			});
			Toast.success('Uploaded successful');
			setSelectedItem(null);
			refetch();
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
