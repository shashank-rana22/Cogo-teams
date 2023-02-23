import { Toast } from '@cogoport/components';
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
			const { manager_count = '20' } = data;

			setNotifyModal(false);
			Toast.success(`${manager_count} Managers Notified...`);
		} catch (e) {
			Toast.error(e.toString());
		}
	};

	return { notify, loading, data, setSendToAll, sendToAll };
};

export default useNotifyManagers;
