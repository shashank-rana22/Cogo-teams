import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';

function useCreateUserInactiveStatus({ fetchworkPrefernce, setOpenModal }) {
	const [{ loading }, trigger] = useRequest({
		url    : '/update_agent_work_preference',
		method : 'post',
	}, { manual: true });

	const updateUserStatus = async (data) => {
		try {
			await trigger({
				data: {
					...data,
				},
			});
			setOpenModal(false);
			Toast.success('succesfully updated your status');
			fetchworkPrefernce();
		} catch (error) {
			Toast.error(getApiErrorString(error?.response?.data));
		}
	};

	return {
		loading,
		updateUserStatus,
	};
}
export default useCreateUserInactiveStatus;
