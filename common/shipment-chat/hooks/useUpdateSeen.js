import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';
import { useCallback, useEffect } from 'react';

const useUpdateSeen = ({ channel_id }) => {
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
		if (channel_id) {
			onCreate();
		}
	}, [channel_id, onCreate]);

	return {
		onCreate,
		loading,
	};
};

export default useUpdateSeen;
