import { useRequest } from '@cogoport/request';
import { useEffect, useCallback } from 'react';

import toastApiError from '../utils/toastApiError';

const useGetChannel = ({ payload }) => {
	const { id } = payload;

	const [{ loading: loadingChannel, data: channel }, trigger] = useRequest({
		url    : 'get_chat_channel',
		method : 'GET',
		params : {
			...payload,
		},
	}, { manual: true });

	const getChannel = useCallback(() => {
		(async () => {
			try {
				await trigger();
			} catch (err) {
				toastApiError(err);
			}
		})();
	}, [trigger]);

	useEffect(() => {
		if (id) {
			getChannel();
		}
	}, [id, getChannel]);

	return {
		loadingChannel,
		getChannel,
		channel,
	};
};

export default useGetChannel;
