import { Toast } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { useHarbourRequest } from '@cogoport/request';

const useCreateLeaveApplication = ({ onClose, refetch, refetchList, setSelectedData }) => {
	const [{ loading }, trigger] = useHarbourRequest({
		method : 'POST',
		url    : '/create_employee_leave_application',
	}, { manual: true });

	const createLeaveApplication = async (values) => {
		const { date_of_joining, half_day, half_day_date, ...rest } = values || {};

		const { startDate, endDate } = date_of_joining || {};

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
						half_day_date: formatDate({
							date       : half_day_date,
							dateFormat : GLOBAL_CONSTANTS.formats.date['yyyy-MM-dd'],
							formatType : 'date',
						}),
						is_halfday: half_day || false,
					},
				});
				setSelectedData();
				refetchList();
				refetch();
				onClose();
				Toast.success('Leave Application Sucessfully');
			} catch (error) {
				Toast.error('Something went wrong');
			}
		} else {
			Toast.error('Please select correct date');
		}
	};

	return { loading, createLeaveApplication };
};

export default useCreateLeaveApplication;
