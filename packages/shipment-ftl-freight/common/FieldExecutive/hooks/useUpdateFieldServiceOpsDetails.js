import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';

import { formatFinalData } from '../utils/formatFinalData';

const useUpdateFieldServiceOpsDetails = ({
	shipment_id = '',
	initFormattedData = '',
	otherFormattedData = '',
	callback: updateCallback = () => {},
}) => {
	const [{ loading, data }, trigger] = useRequest({
		url    : '/create_shipment_field_service_ops_detail',
		method : 'POST',
	}, { manual: true });

	const updateDetails = async (truck_number) => {
		const formattedData = formatFinalData({
			shipment_id,
			truck_number,
			initFormattedData,
			otherFormattedData,
		});

		try {
			await trigger({
				data: { ...formattedData, is_data_append_required: false },
			});
			updateCallback();
		} catch (error) {
			Toast.error(error?.data);
		}
	};

	const updateTruckNumber = async ({
		truck_number = '',
		callback = () => {},
		updated_truck_number = '',
	}) => {
		try {
			await trigger({
				data: {
					shipment_id,
					truck_number,
					updated_truck_number,
				},
			});
			callback();
		} catch (error) {
			Toast.error(getApiErrorString(error?.data) || 'Something went wrong');
		}
	};

	return {
		updateDetails,
		updateTruckNumber,
		loading,
		data,
	};
};

export default useUpdateFieldServiceOpsDetails;
