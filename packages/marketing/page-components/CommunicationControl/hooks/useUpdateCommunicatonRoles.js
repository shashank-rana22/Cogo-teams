import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';

import toastApiError from '../utils/toastApiError';

const useUpdateCommunicatonRoles = ({
	refetch = () => {},
}) => {
	const [{ loading }, trigger] = useRequest({
		url    : '/update_communication_channel_management',
		method : 'POST',
	}, { manual: true });

	const updateRoles = async (payload) => {
		try {
			await trigger({
				data: payload,
			});

			Toast.success('Assigned Successfully');
			refetch();
		} catch (error) {
			toastApiError(error);
		}
	};

	return {
		loading,
		updateRoles,
	};
};

export default useUpdateCommunicatonRoles;
