import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { useHarbourRequest } from '@cogoport/request';

const useGetAttendanceTimesheet = (date) => {
	const [{ loading, data }] = useHarbourRequest({
		method : 'GET',
		url    : '/list_timesheet',
		params : {
			curr_date: formatDate({
				date,
				dateFormat : GLOBAL_CONSTANTS.formats.date['yyyy-MM-dd'],
				formatType : 'date',
			}),
		},
	}, { manual: false });

	return { loading, data };
};

export default useGetAttendanceTimesheet;
