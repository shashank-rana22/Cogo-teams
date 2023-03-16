import { useCallback } from 'react';
import { useRequest } from '@cogoport/request';
import { Toast } from '@cogoport/components';

const useUpdateSeen = ({ refetch = () => { }, channel_id }) => {

	const [trigger] = useRequest({
		url: 'update_chat_channel_seen',
		method: 'POST',
	}, { manual: true });

	const onCreate = useCallback(() => {
		(async () => {
			try {
				await trigger({
					data: {
						id: id.length ? id : channel_id,
					},
				});
			} catch (err) {
				Toast.error(err?.data);
			}
		})();
	}, [trigger]);

	return {
		onCreate,
		// loading: updateShipmentAPI.loading,
	};
};

export default useUpdateSeen;
