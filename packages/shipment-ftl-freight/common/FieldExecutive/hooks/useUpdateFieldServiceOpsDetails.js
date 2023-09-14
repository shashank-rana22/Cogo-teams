import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';
import toastApiError from '@cogoport/surface-modules/utils/toastApiError';
import { isEmpty } from '@cogoport/utils';

import { formatFinalData } from '../utils/formatFinalData';

const useUpdateFieldServiceOpsDetails = ({
	shipment_id = '',
	initFormattedData = {},
	otherFormattedData = {},
	truck_type = '',
	callback: updateCallback = () => {},
	updateTruckMsg = 'Truck Number Updated Successfully!!',
	updateDetailMsg = 'Data Updated Successfully!!',
}) => {
	const [{ loading, data }, trigger] = useRequest({
		url    : '/create_shipment_field_service_ops_detail',
		method : 'POST',
	}, { manual: true });

	const updateDetails = async (truck_number) => {
		const formattedData = formatFinalData({
			shipment_id,
			truck_number,
			truck_type,
			initFormattedData,
			otherFormattedData,
		});

		const isDocPresent = Object.values(initFormattedData).some(
			(values) => !isEmpty(values),
		);

		if (!isDocPresent) {
			Toast.error('Please Upload Atleast a Single Document');
			return;
		}

		try {
			await trigger({
				data: { ...formattedData, is_data_append_required: false },
			});
			Toast.success(updateDetailMsg);
			updateCallback();
		} catch (error) {
			toastApiError(error);
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
			Toast.success(updateTruckMsg);
			callback();
		} catch (error) {
			toastApiError(error);
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
