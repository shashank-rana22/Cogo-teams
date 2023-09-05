import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { useHarbourRequest } from '@cogoport/request';

const useCreateLeaveApplication = ({ onClose, refetch, refetchList, setSelectedData }) => {
	const [{ loading }, trigger] = useHarbourRequest({
		method : 'POST',
		url    : '/create_employee_leave_application',
	}, { manual: true });

	const createLeaveApplication = async (values) => {
		const { date_range, half_day, half_day_date, ...rest } = values || {};

		const { startDate, endDate } = date_range || {};

		if (startDate && endDate) {
			try {
				await trigger({
					data: {
						...rest,
						leave_start_date: formatDate({
							date       : startDate,
							dateFormat : GLOBAL_CONSTANTS.formats.date['yyyy-MM-dd'],
							formatType : 'date',
						}),
						leave_end_date: formatDate({
							date       : endDate,
							dateFormat : GLOBAL_CONSTANTS.formats.date['yyyy-MM-dd'],
							formatType : 'date',
						}),
						half_day_date: half_day ? formatDate({
							date       : half_day_date,
							dateFormat : GLOBAL_CONSTANTS.formats.date['yyyy-MM-dd'],
							formatType : 'date',
						}) : undefined,
						is_halfday: half_day || false,
					},
				});
				setSelectedData();
				refetchList();
				refetch();
				onClose();
				Toast.success('Leave Application Sucessfully');
			} catch (error) {
				Toast.error(getApiErrorString(error?.response?.data) || 'Something went wrong');
			}
		} else {
			Toast.error('Please select correct date');
		}
	};

	return { loading, createLeaveApplication };
};

export default useCreateLeaveApplication;
