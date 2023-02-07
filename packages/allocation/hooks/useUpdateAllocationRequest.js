import { Toast } from '@cogoport/components';
import { getApiErrorString } from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';
import { useState } from 'react';

const useUpdateRequestStatus = (props) => {
	const { fetchList } = props;

	const [requestStatusItem, setRequestStatusItem] = useState({});

	const api = useRequest({
		url    : '/update_allocation_request',
		method : 'POST',
	});

	const [{ loading }, trigger] = api;

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
