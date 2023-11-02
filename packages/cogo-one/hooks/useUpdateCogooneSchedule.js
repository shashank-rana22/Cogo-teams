import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';

import getMonthStartAndEnd from '../utils/getMonthStartAndEnd';

const useUpdateCogooneSchedule = ({
	handleClose = () => {},
	getEvents = () => {},
	month = '',
	activeTab = '',
	handleCallApi = () => {},
}) => {
	const getUrl = activeTab === 'schedules' ? '/update_cogoone_schedule' : '/update_cogoone_calendar';
	const { startDate, endDate } = getMonthStartAndEnd({ month });

	const [{ loading }, trigger] = useRequest({
		url    : getUrl,
		method : 'post',
	}, { manual: true });

	const updateCogooneSchedule = async ({ payload }) => {
		try {
			await trigger({
				params: payload,
			});
			handleClose();
			getEvents({ startDate, endDate });
			if (activeTab === 'calendars') {
				handleCallApi();
			}
			Toast.success('Updated Successfully!');
		} catch (error) {
			Toast.error(getApiErrorString(error?.response?.data));
		}
	};

	return { loading, updateCogooneSchedule };
};

export default useUpdateCogooneSchedule;
