import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useHarbourRequest } from '@cogoport/request';

const getPayload = ({ SOURCE, addon_details, device_details, id, maxReimbursementAmount }) => {
	const payload = { id };

	if (SOURCE === 'DeviceDetails') {
		payload.device_details = device_details;
	}

	if (SOURCE === 'AddonDetails') {
		payload.addon_details = addon_details;
	}
	if (SOURCE === 'maxreimbursement') {
		payload.maximum_reimbursement_amount = maxReimbursementAmount;
	}

	return payload;
};

const useUpdateDeviceDetails = ({
	id,
	SOURCE,
	setShowDevice = () => {},
	setShowAccessories = () => {},
	getEmployeeReimbursementGroup = () => {},
}) => {
	const [{ btnloading, data }, trigger] = useHarbourRequest({
		url    : 'update_employee_device_reimbursement_group',
		method : 'POST',
	}, { manual: true });

	const updateDeviceDetails = async ({ device_details = [], addon_details = [], maxReimbursementAmount = '' }) => {
		try {
			const payload = getPayload({ SOURCE, device_details, addon_details, id, maxReimbursementAmount });

			await trigger({
				data: payload,
			});

			setShowDevice(false);
			setShowAccessories(false);
		} catch (err) {
			Toast.error(getApiErrorString(err?.response?.data) || 'Something went wrong');
		}
		getEmployeeReimbursementGroup(id);
	};

	return {
		btnloading,
		data,
		updateDeviceDetails,
	};
};

export default useUpdateDeviceDetails;
