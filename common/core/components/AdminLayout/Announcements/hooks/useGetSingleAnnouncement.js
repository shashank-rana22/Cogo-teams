import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';
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
			Toast.error(error?.message);
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
