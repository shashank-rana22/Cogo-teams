import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';
import { useCallback, useEffect } from 'react';

const useUpdateSeen = ({ channel_id, showUnreadChat }) => {
	const [{ loading }, trigger] = useRequest({
		url    : 'update_chat_channel_seen',
		method : 'POST',
	}, { manual: true });

	const onCreate = useCallback(() => {
		(async () => {
			try {
				await trigger({
					data: {
						id: channel_id,
					},
				});
			} catch (err) {
				Toast.error(err?.data);
			}
		})();
	}, [trigger, channel_id]);

	useEffect(() => {
		if (channel_id && !showUnreadChat) {
			onCreate();
		}
	}, [channel_id, onCreate, showUnreadChat]);

	return {
		onCreate,
		loading,
	};
};

export default useUpdateSeen;
