import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';
import { startCase } from '@cogoport/utils';
import { useEffect, useCallback } from 'react';

const useGetSingleAnnouncement = (id = '') => {
	const [{ loading, data }, trigger] = useRequest({
		method : 'GET',
		url    : '/get_announcement',
	}, { manual: true });

	const fetchDetails = useCallback(() => {
		try {
			trigger({
				params: {
					id,
				},
			});
		} catch (error) {
			if (error?.response) {
				Toast.error(startCase(getApiErrorString(error?.response?.data)) || 'Something went wrong');
			}
		}
	}, [id, trigger]);

	useEffect(() => {
		if (id) { fetchDetails(); }
	}, [fetchDetails, id]);

	return {
		loadingSingleAnnouncement : loading,
		announcementDetails       : data || {},
	};
};

export default useGetSingleAnnouncement;
