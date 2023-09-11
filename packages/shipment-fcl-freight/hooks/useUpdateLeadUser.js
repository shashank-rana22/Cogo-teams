import { Toast } from '@cogoport/components';
import toastApiError from '@cogoport/ocean-modules/utils/toastApiError';
import { useRequest } from '@cogoport/request';

function useUpdateLeadUser() {
	const [{ loading }, trigger] = useRequest({
		url    : '/update_lead_user',
		method : 'POST',
	}, { manual: true });

	const updateLeadUser = async ({ payload }) => {
		try {
			await trigger({ data: payload });

			Toast.success('Successful');
		} catch (error) {
			toastApiError(error);
		}
	};

	return {
		updateLoading: loading,
		updateLeadUser,
	};
}

export default useUpdateLeadUser;
