import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';

import toastApiError from '../utils/toastApiError';

const API_MAPPING = {
	email    : { api: 'update_campaign_email_configuration', method: 'POST' },
	whatsapp : { api: 'update_communication_credential', method: 'PUT' },
};

const useUpdateStatus = ({
	getChannelConfig = () => {},
	channel = 'whatsapp',
}) => {
	const [{ loading }, trigger] = useRequest({
		url    : `/${API_MAPPING[channel].api}`,
		method : `${API_MAPPING[channel].method}`,
	}, { manual: true });

	const updateStatus = async (payload) => {
		const { whatsapp_number = '', email = '', status } = payload || {};

		try {
			await trigger({
				data: {
					whatsapp_number : whatsapp_number || undefined,
					email           : email || undefined,
					status          : status === 'active' ? 'inactive' : 'active',
				},
			});

			Toast.success(
				`${status === 'active' ? 'Deactived' : 'Actived'} Successfully`,
			);
			getChannelConfig();
		} catch (error) {
			toastApiError(error);
		}
	};

	return {
		updateStatusLoading: loading,
		updateStatus,
	};
};

export default useUpdateStatus;
