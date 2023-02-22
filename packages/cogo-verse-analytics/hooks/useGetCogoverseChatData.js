import { useRequest } from '@cogoport/request';
import { useState, useEffect } from 'react';

const useGetCogoverseChatData = ({ country = {}, date = {} }) => {
	const [chatData, setChatData] = useState({
		fullResponse: {},
	});

	const [{ error, loading }, trigger, refetch] = useRequest({
		url    : '/get_cogoverse_platform_chat_data',
		method : 'GET',
		params : {
			mobile_country_code : country?.mobile_country_code || undefined,
			start_date          : date?.startDate || undefined,
			end_date            : date?.endDate || undefined,

		},
	}, { manual: true });

	useEffect(() => {
		trigger()
			.then((res) => {
				setChatData(() => ({
					fullResponse: res.data,
				}));
			})
			.catch(() => {
				setChatData(() => ({

					fullResponse : {},
					reverted     : 0,
				}));
			});
		// eslint-disable-next-line
	}, [date]);

	return {
		chatLoading: loading,
		chatData,
		error,
		refetch,
	};
};

export default useGetCogoverseChatData;
