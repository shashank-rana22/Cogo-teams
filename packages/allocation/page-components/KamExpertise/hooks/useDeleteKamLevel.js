import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useAllocationRequest } from '@cogoport/request';
// import React from 'react';

function useDeleteKamLevel(props) {
	const { refetch, dataLength } = props;
	const [{ loading }, trigger] = useAllocationRequest({
		method  : 'POST',
		url     : 'kam_expertise_configuration_attributes',
		authkey : 'post_allocation_kam_expertise_configuration_attributes',
	}, { manual: true });

	const onDelete = async () => {
		try {
			const payload = {
				transition_level    : dataLength + 1,
				level_to_be_deleted : true,
			};
			await trigger({
				data: payload,
			});
		} catch (error) {
			Toast.error(getApiErrorString(error.response?.data));
		}
		refetch();
	};
	return {
		loading,
		onDelete,
	};
}

export default useDeleteKamLevel;
