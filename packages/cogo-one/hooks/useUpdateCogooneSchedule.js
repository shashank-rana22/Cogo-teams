import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';
import moment from 'moment';

const useUpdateCogooneSchedule = ({
	handleClose = () => {},
	getEvents = () => {},
	month = '',
	handleUpdatedState = () => {},
}) => {
	const startDate = moment(month).startOf('month').toDate();
	const endDate = moment(month).endOf('month').toDate();

	const [{ loading }, trigger] = useRequest({
		url    : '/update_cogoone_schedule',
		method : 'post',
	}, { manual: true });

	const updateCogooneSchedule = async ({ payload }) => {
		try {
			await trigger({
				params: payload,
			});
			handleClose();
			getEvents({ startDate, endDate });
			handleUpdatedState();
			Toast.success('Updated Successfully!');
		} catch (error) {
			Toast.error(getApiErrorString(error?.response?.data));
		}
	};

	return { loading, updateCogooneSchedule };
};

export default useUpdateCogooneSchedule;
