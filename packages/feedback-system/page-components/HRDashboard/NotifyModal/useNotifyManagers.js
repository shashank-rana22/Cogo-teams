import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';
import { useState } from 'react';

const useNotifyManagers = ({ setNotifyModal = () => {} }) => {
	const [sendToAll, setSendToAll] = useState(false);
	const [{ loading = false, data = {} }, trigger] = useRequest({
		url    : 'notify_managers',
		method : 'post',
	}, { manual: true });

	const notify = async () => {
		try {
			await trigger({ data: { SendToAll: sendToAll } });
			const { manager_count } = data;

			setNotifyModal(false);
			Toast.success(`${manager_count} Managers Notified...`);
		} catch (e) {
			Toast.error(getApiErrorString(e.data));
		}
	};

	return { notify, loading, data, setSendToAll, sendToAll };
};

export default useNotifyManagers;
