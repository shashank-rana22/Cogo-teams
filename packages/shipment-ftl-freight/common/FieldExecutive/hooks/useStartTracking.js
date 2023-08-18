import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';

const useStartTracking = ({ shipment_data = {}, servicesList = [] }) => {
	const [{ loading, data }, trigger] = useRequest({
		url    : '/create_saas_surface_shipment_detail',
		method : 'POST',
	}, { manual: true });

	const createTracking = async ({ truck_number = '', mobile_number = '' }) => {
		const {
			origin_location_id,
			destination_location_id,
		} =	servicesList.find((item) => item?.origin_location_id) || {};

		try {
			await trigger({
				data: {
					truck_number,
					serial_id     : `${shipment_data?.serial_id}`,
					mobile_number : `${mobile_number}`,
					origin_location_id,
					destination_location_id,
				},
			});
			Toast.success('Service Updated Successfully');
		} catch (error) {
			Toast.error(error?.data?.message || 'Unable to Apply for service');
		}
	};

	return {
		createTracking,
		loading,
		data,
	};
};

export default useStartTracking;
