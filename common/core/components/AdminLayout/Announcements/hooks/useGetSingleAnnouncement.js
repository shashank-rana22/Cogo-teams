import { useRequest } from '@cogoport/request';
import { useEffect, useCallback } from 'react';

const useGetSingleAnnouncement = (id = '') => {
	const [{ loading, data }, trigger] = useRequest({
		method : 'GET',
		url    : '/get_announcement',
	}, { manual: true });

	const fetchDetails = useCallback(() => {
		if (id) {
			try {
				trigger({
					params: {
						id,
					},
				});
			} catch (error) {
				console.log('error :: ', error);
			}
		}
	}, [id, trigger]);

	useEffect(() => {
		fetchDetails();
	}, [fetchDetails, id]);

	return {
		loadingSingleAnnouncement : loading,
		announcementDetails       : data || {},
	};
};

export default useGetSingleAnnouncement;
