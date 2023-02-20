import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';
import { isEmpty } from '@cogoport/utils';

function useCreateUserInactiveStatus({ fetchworkPrefernce, setOpenModal }) {
	const [{ loading }, trigger] = useRequest({
		url    : '/update_agent_work_preference',
		method : 'post',
	}, { manual: true });

	const updateUserStatus = async ({ val, inactiveReason, reset }) => {
		const { days = '', hours = '', minutes = '' } = val || {};
		const duration = days * 1440 + hours * 60 + minutes;
		if (isEmpty(days) && isEmpty(hours) && isEmpty(minutes)) {
			Toast.error(('Please select duration'));
		} else if (minutes < 0 || minutes > 59) {
			Toast.error(('Minutes should between 0 to 59'));
		} else if (hours > 24) {
			Toast.error(('Hours should not be greaterthen 24'));
		} else {
			try {
				await trigger({
					data: {
						status: inactiveReason,
						duration,
					},
				});
				setOpenModal(false);
				Toast.success('succesfully updated your status');
				fetchworkPrefernce();
				reset({ days: '', hours: '', minutes: '' });
			} catch (error) {
				Toast.error(getApiErrorString(error?.response?.data));
			}
		}
	};

	return {
		loading,
		updateUserStatus,
	};
}
export default useCreateUserInactiveStatus;
