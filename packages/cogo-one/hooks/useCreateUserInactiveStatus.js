import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { isEmpty } from '@cogoport/utils';

const useCreateUserInactiveStatus = () => {
	const { userId } = useSelector(({ profile }) => ({ userId: profile?.user?.id }));

	const [{ loading }, trigger] = useRequest({
		url    : '/update_agent_work_preference',
		method : 'post',
	}, { manual: true });

	const userStatus = async ({ inactiveReason = '', endDate = '', startDate = '' }) => {
		// const { inactive_status = '', inactive_date = {}, inactive_time = {} } = data;
		// console.log('inactive_status', inactive_status);
		// console.log('inactive_time', inactive_time);
		// console.log('inactive_date', inactive_date);
		// const checkReasons = inactive_status === 'on_break' || inactive_status === 'on_lunch';
		// const checkDate = isEmpty(inactive_date?.startDate) && isEmpty(inactive_date?.endDate);
		try {
			if (isEmpty(startDate) && isEmpty(endDate)) {
				Toast.error('Please select start and end time');
			} else {
				await trigger({
					data: {
						agent_id       : userId,
						status         : inactiveReason,
						validity_start : startDate,
						validity_end   : endDate,
					},
				});
			}
		} catch (error) {
			Toast.error(getApiErrorString(error?.error));
		}
	};

	return {
		loading,
		userStatus,
	};
};
export default useCreateUserInactiveStatus;
