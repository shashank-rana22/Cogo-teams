import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useHarbourRequest } from '@cogoport/request';

const TOAST_MESSAGE = {
	send_quickchex_mail : 'Email sent Sucessfully to all the selected employees',
	move_to_probation   : 'All the Selected employees moved to the Employee Directory under probation',
};

const useBulkEmployeeDetails = ({ selectedIds, setShowModal = () => {} }) => {
	const [{ btnloading }, trigger] = useHarbourRequest({
		url    : '/bulk_employee_actions',
		method : 'POST',
	}, { manual: true });

	const sendBulkActionMail = async (action) => {
		try {
			const payload = {
				action_name         : action,
				employee_detail_ids : selectedIds,
			};

			await trigger({ data: payload });

			setShowModal(false);
			Toast(TOAST_MESSAGE[action]);
		} catch (err) {
			Toast.error(getApiErrorString(err?.response?.data) || 'Something went wrong');
		}
	};

	return {
		btnloading,
		sendBulkActionMail,
	};
};

export default useBulkEmployeeDetails;
