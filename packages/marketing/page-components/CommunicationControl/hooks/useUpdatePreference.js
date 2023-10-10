import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';

import toastApiError from '../utils/toastApiError';

const useUpdatePreference = ({ refetch = () => {} }) => {
	const [{ loading }, trigger] = useRequest({
		url    : '/update_user_alert_preference',
		method : 'POST',
	}, { manual: true });

	const updatePreference = async (payload) => {
		try {
			await trigger({
				data: payload,
			});
			Toast.success('Preferences has been successfully saved');
			refetch();
		} catch (error) {
			toastApiError(error);
		}
	};

	return {
		loading,
		updatePreference,
	};
};

export default useUpdatePreference;
