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

	const userStatus = async (data = {}) => {
		const { inactive_status = '', inactive_date = {}, inactive_time = {} } = data;
		// console.log('inactive_status', inactive_status);
		// console.log('inactive_time', inactive_time);
		// console.log('inactive_date', inactive_date);
		const checkReasons = inactive_status === 'on_break' || inactive_status === 'on_lunch';
		const checkDate = isEmpty(inactive_date?.startDate) && isEmpty(inactive_date?.endDate);

		try {
			if (isEmpty(inactive_status)) {
				Toast.error('please select resons for inactive');
			} else if (checkReasons && isEmpty(inactive_time)) {
				Toast.error('please select inactive time');
			} else if (inactive_status === 'on_leave' && checkDate) {
				Toast.error('please select inactive date');
			}
			await trigger({
				data: {
					agent_id       : userId,
					status         : inactive_status,
					validity_start : inactive_date?.startDate,
					validity_end   : inactive_date?.endDate,
				},
			});
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
