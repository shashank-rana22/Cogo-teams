import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useHarbourRequest } from '@cogoport/request';

const useBulkEmployeeDetails = ({ selectedIds }) => {
	const [{ btnloading }, trigger] = useHarbourRequest({
		url    : '/bulk_employee_actions',
		method : 'POST',
	}, { manual: true });

	const sendBulkActionMail = async () => {
		const payload = {
			action_name         : 'send_quickchex_mail',
			employee_detail_ids : selectedIds,
		};

		try {
			await trigger({
				data: payload,
			});

			Toast('Email sent Sucessfully to all the selected employees');
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
