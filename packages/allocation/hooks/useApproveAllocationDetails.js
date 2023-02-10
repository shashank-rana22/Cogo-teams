import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';

const useApproveAllocationDetails = ({ setShowApprove, listRefetch }) => {
	const {
		general: { query = {} },
	} = useSelector((state) => state);

	const { instance_id = '' } = query;

	const [{ loading }, trigger] = useRequest({
		url    : '/approve_allocation_details',
		method : 'POST',
	}, { manual: true });

	const onApproveDetails = async () => {
		try {
			await trigger({
				data: { allocation_instance_id: instance_id },
			});

			setShowApprove(false);

			Toast.success('Details approved successfully!');

			listRefetch();
		} catch (error) {
			Toast.error(getApiErrorString(error.response?.data));
		}
	};

	return {
		onApproveDetails,
		loadingApproveDetails: loading,
	};
};

export default useApproveAllocationDetails;
