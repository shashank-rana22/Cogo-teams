import { Toast } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useAllocationRequest } from '@cogoport/request';

const useUpdateRequestStatus = (props) => {
	const { fetchList, requestStatusItem, setRequestStatusItem } = props;

	const [{ loading }, trigger] = useAllocationRequest({
		url     : '/request_status',
		method  : 'POST',
		authkey : 'post_allocation_request_status',
	}, { manual: true });

	const formProps = useForm();

	 const { reset } = formProps;

	const onStatusUpdate = async (formValues) => {
		const { rejection_reasons } = formValues || {};

		try {
			const payload = {
				...requestStatusItem,
				rejection_reasons: rejection_reasons?.length !== 0 ? rejection_reasons : undefined,
			};

			await trigger({
				data: payload,
			});

			fetchList();

			setRequestStatusItem({});

			reset();

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
		formProps,
	};
};

export default useUpdateRequestStatus;
