import { useRequest } from '@cogoport/request';
import toastApiError from '@cogoport/surface-modules/utils/toastApiError';
import { useEffect, useCallback } from 'react';

const useGetDistance = ({ destination_location_id, origin_location_id }) => {
	const [{ loading, data }, trigger] = useRequest({
		url    : '/get_distance_matrix_valhalla',
		method : 'GET',
	});

	const getDistance = useCallback(async () => {
		try {
			await trigger(
				{
					params: {
						origin_location_id,
						destination_location_id,
						is_authorization_required: false,
					},
				},
			);
		} catch (err) {
			toastApiError(err);
		}
	}, [trigger, origin_location_id, destination_location_id]);

	useEffect(() => {
		getDistance();
	}, [getDistance]);

	return {
		loading,
		data: data?.data,
	};
};

export default useGetDistance;
