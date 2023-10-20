import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useHarbourRequest } from '@cogoport/request';
import { useEffect, useCallback } from 'react';

const useListAllFeed = () => {
	const [{ data, loading }, trigger] = useHarbourRequest({
		method : 'GET',
		url    : '/list_all_feed',
	}, { manual: true });

	const listAllFeed = useCallback(
		() => {
			try {
				trigger();
			} catch (error) {
				Toast.error(getApiErrorString(error?.response?.data) || 'Something went wrong');
			}
		},
		[trigger],
	);

	useEffect(() => {
		listAllFeed();
	}, [listAllFeed]);

	return {
		loading,
		data,
		refetch: listAllFeed,
	};
};

export default useListAllFeed;
