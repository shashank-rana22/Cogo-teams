import toastApiError from '@cogoport/air-modules/utils/toastApiError';
import { useRequest } from '@cogoport/request';
import { useEffect, useCallback } from 'react';

const useGetMovementDetails = ({ shipment_id = '' }) => {
	const [{ data, loading }, trigger] = useRequest({
		url    : '/get_shipment_air_movement_details',
		method : 'get',
	});

	const getTrackingInformation = useCallback(() => {
		(async () => {
			try {
				await trigger({
					params: {
						shipment_id,
					},
				});
			} catch (err) {
				toastApiError(err);
			}
		})();
	}, [trigger, shipment_id]);

	useEffect(() => {
		getTrackingInformation();
	}, [getTrackingInformation, shipment_id]);

	return {
		data,
		loading,
	};
};

export default useGetMovementDetails;
