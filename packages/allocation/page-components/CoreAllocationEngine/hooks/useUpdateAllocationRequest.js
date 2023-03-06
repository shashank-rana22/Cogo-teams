import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useAllocationRequest } from '@cogoport/request';

const useUpdateRequestStatus = (props) => {
	const { fetchList, requestStatusItem, setRequestStatusItem } = props;

	const [{ loading }, trigger] = useAllocationRequest({
		url     : '/request_status',
		method  : 'POST',
		authkey : 'post_allocation_request_status',
	}, { manual: true });

	const onStatusUpdate = async () => {
		try {
			const payload = {
				...requestStatusItem,
			};

			await trigger({
				data: payload,
			});

			fetchList();

			setRequestStatusItem({});

			Toast.success('Request updated successfully!');
		} catch (error) {
			Toast.error(getApiErrorString(error.response?.data));
		}
	};

	return {
		onStatusUpdate,
		loadingUpdate: loading,
		requestStatusItem,
		setRequestStatusItem,
	};
};

export default useUpdateRequestStatus;
