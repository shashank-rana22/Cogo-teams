import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';
import { useState } from 'react';

const useDeleteAllocationInstance = ({ listInstancesRefetch = () => {} }) => {
	const [instanceId, setInstanceId] = useState(null);

	const [{ loading }, trigger] = useRequest({
		url    : '/delete_allocation_instance_job',
		method : 'POST',
	}, { manual: true });

	const onInstanceDelete = async (event, id) => {
		event.stopPropagation();

		try {
			const payload = { id };

			await trigger({
				data: payload,
			});

			setInstanceId(null);

			listInstancesRefetch();

			Toast.success('Instance deleted successfully!');
		} catch (error) {
			Toast.error(getApiErrorString(error.response?.data));
		}
	};

	return {
		onInstanceDelete,
		loadingInstanceDelete: loading,
		instanceId,
		setInstanceId,
	};
};

export default useDeleteAllocationInstance;
