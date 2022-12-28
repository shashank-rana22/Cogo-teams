import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';
import { useEffect } from 'react';

const useGetPrefrencesUpdatedStats = ({ shipment_id, service }) => {
	const [{ data, loading }, trigger] = useRequest(
		'/list_shipment_booking_confirmation_preferences',
		{ manual: true },
	);

	const handleApi = async () => {
		try {
			const params = {
				filters: {
					shipment_id,
					service_type : service?.service_type || undefined,
					service_id   : service?.id || undefined,
				},
			};

			await trigger({ params });
		} catch (err) {
			Toast.error(err);
		}
	};

	useEffect(() => {
		if (shipment_id) {
			handleApi(shipment_id);
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return {
		data,
		statsLoading: loading,
	};
};

export default useGetPrefrencesUpdatedStats;
