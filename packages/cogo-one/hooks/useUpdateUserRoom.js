import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';

const useUpdateUserRoom = () => {
	const [{ loading:updateRoomLoading }, trigger] = useRequest(
		{
			url    : 'update_user_room',
			method : 'post',
		},
		{ manual: true },
	);

	const updateUserRoom = async (mobileNumber = '') => {
		try {
			await trigger({
				data: {
					mobile_number: mobileNumber,
				},
			});
			Toast.success('User Updated Successfully');
		} catch (error) {
			Toast.error(getApiErrorString(error?.response?.data));
		}
	};

	return {
		updateRoomLoading,
		updateUserRoom,
	};
};
export default useUpdateUserRoom;
