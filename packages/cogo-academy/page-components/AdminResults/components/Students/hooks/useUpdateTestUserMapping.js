import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';
import { useState } from 'react';

function useUpdateTestUserMapping({ refetch }) {
	const [userId, setUserId] = useState('');
	const [{ loading }, trigger] = useRequest({
		url    : '/update_test_user_mapping',
		method : 'POST',
	}, { manual: true });

	const userSessionMapping = async (test_id) => {
		try {
			await trigger({
				data: {
					test_id,
					user_id : userId,
					status  : 'inactive',
				},
			});
			refetch();
			Toast.success('User has been deleted successfully');
		} catch (err) {
			Toast.error(getApiErrorString(err?.response?.data) || 'Something went wrong');
		}
	};

	return {
		loading,
		userSessionMapping,
		setUserId,
	};
}

export default useUpdateTestUserMapping;
