import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';
import { useEffect, useCallback } from 'react';

const useGetChannel = ({ channel_id }) => {
	const [{ loading: loadingChannel, data: channel }, trigger] = useRequest({
		url    : 'get_chat_channel',
		method : 'GET',
	}, { manual: true });

	const getChannel = useCallback(() => {
		(async () => {
			try {
				await trigger({
					params: {
						id: channel_id,
					},
				});
			} catch (err) {
				Toast.error(err);
			}
		})();
	}, [trigger, channel_id]);

	const primaryService = channel?.primary_service_detail;
	const channelData = channel?.summary || {};

	useEffect(() => {
		if (channel_id) {
			getChannel();
		}
	}, [channel_id, getChannel]);

	return {
		get: {
			loadingChannel,
			refetch : getChannel,
			data    : {
				channelData,
				primaryService,
			},
		},
		personal_data: channel,
	};
};

export default useGetChannel;
