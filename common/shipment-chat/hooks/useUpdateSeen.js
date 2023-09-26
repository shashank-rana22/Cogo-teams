import { useRequest } from '@cogoport/request';
import { useCallback, useEffect } from 'react';

import toastApiError from '../utils/toastApiError';

const useUpdateSeen = ({ payload }) => {
	const { id = '', showUnreadChat = false, status = '' } = payload;

	const [{ loading }, trigger] = useRequest({
		url    : 'update_chat_channel_seen',
		method : 'POST',
		data   : {
			id,
		},
	}, { manual: true });

	const onSeen = useCallback(() => {
		(async () => {
			try {
				await trigger();
			} catch (err) {
				toastApiError(err);
			}
		})();
	}, [trigger]);

	useEffect(() => {
		if (id && !showUnreadChat && status !== 'unread') {
			onSeen();
		}
	}, [id, onSeen, showUnreadChat, status]);

	return {
		onSeen,
		loading,
	};
};

export default useUpdateSeen;
