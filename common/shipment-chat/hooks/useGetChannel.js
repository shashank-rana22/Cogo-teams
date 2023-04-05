import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';
import { useEffect, useCallback } from 'react';

import getApiErrorString from '../utils/getApiErrorString';

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
				Toast.error(getApiErrorString(err));
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
