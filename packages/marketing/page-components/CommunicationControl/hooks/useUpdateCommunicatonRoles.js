import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';

import toastApiError from '../utils/toastApiError';

const useUpdateCommunicatonRoles = ({
	getChannelConfig = () => {},
	setShow = () => {},
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
			getChannelConfig();
			setShow(false);
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
