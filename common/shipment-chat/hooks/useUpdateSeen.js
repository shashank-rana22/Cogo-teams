import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';
import { useCallback, useEffect } from 'react';

import getApiErrorString from '../utils/getApiErrorString';

const useUpdateSeen = ({ payload }) => {
	const { id = '', showUnreadChat = false } = payload;

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
				Toast.error(getApiErrorString(err));
			}
		})();
	}, [trigger]);

	useEffect(() => {
		if (id && !showUnreadChat) {
			onSeen();
		}
	}, [id, onSeen, showUnreadChat]);

	return {
		onSeen,
		loading,
	};
};

export default useUpdateSeen;
