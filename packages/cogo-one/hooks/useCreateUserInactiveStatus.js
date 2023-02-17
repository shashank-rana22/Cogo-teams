import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';
import { format } from '@cogoport/utils';

function useCreateUserInactiveStatus({ workPrefernce, setOpenModal }) {
	const [{ loading }, trigger] = useRequest({
		url    : '/update_agent_work_preference',
		method : 'post',
	}, { manual: true });

	const userStatus = async ({ inactiveReason = '', endDate = '', startDate = '' }) => {
		try {
			if (startDate === '' && endDate === '') {
				Toast.error('Please select start and end time');
			} else {
				await trigger({
					data: {
						status         : inactiveReason,
						validity_start : format(
							startDate,
							'yyyy-MM-dd HH:mm:ss',
						),
						validity_end: format(
							endDate,
							'yyyy-MM-dd HH:mm:ss',
						),
					},
				});
			}
			setOpenModal(false);
			Toast.success(getApiErrorString('succesfully updated your status'));
			workPrefernce();
		} catch (error) {
			Toast.error(getApiErrorString(error?.response?.data));
		}
	};

	return {
		loading,
		userStatus,
	};
}
export default useCreateUserInactiveStatus;
