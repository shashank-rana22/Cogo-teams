import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';
import moment from 'moment';

const getPayload = ({ value = {}, actionStatus = '' }) => ({
	schedule_id : value?.schedule_id,
	status      : actionStatus,
});

const useUpdateCogooneSchedule = ({
	actionModal = {},
	handleClose = () => {},
	getEvents = () => {},
	month = '',
}) => {
	const { value = {},	actionStatus = '' } = actionModal || {};

	const startDate = moment(month).startOf('month').toDate();
	const endDate = moment(month).endOf('month').toDate();

	const [{ loading }, trigger] = useRequest({
		url    : '/update_cogoone_schedule',
		method : 'post',
	}, { manual: true });

	const updateCogooneSchedule = async () => {
		try {
			await trigger({
				params: getPayload({ value, actionStatus }),
			});
			handleClose();
			getEvents({ startDate, endDate });
			Toast.success('Updated Successfully!');
		} catch (e) {
			Toast.error(e?.response?.data || 'something went wrong');
		}
	};

	return { loading, updateCogooneSchedule };
};

export default useUpdateCogooneSchedule;
