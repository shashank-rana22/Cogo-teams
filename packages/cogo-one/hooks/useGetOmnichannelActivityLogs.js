import { useRequest } from '@cogoport/request';
import { useEffect, useState } from 'react';

const useGetOmnichannelActivityLogs = ({
	activeMessageCard = {},
	activityTab = '',
	searchValue = '',
	activeVoiceCard = {},
}) => {
	// const [pagination, setPagination] = useState(1);

	const [{ loading, data }, trigger] = useRequest({
		url    : '/get_omnichannel_activity_logs',
		method : 'get',
	}, { manual: true });

	const fetchActivityLogs = async (filters = []) => {
		await trigger({
			params: {
				user_id: '38a3ce88-d1e4-4a55-b431-12aa334a0be1',
				// activity_type : '',
			},
		});
	};

	// const handleScroll = (clientHeight, scrollTop, scrollHeight) => {
	// 	const reachBottom = scrollHeight - (clientHeight + scrollTop) <= 0;
	// 	const hasMoreData = pagination < listData?.total;

	// 	if (reachBottom && hasMoreData && !loading) {
	// 		setPagination((p) => p + 1);
	// 	}
	// };

	useEffect(() => {
		fetchActivityLogs();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [activeMessageCard, activityTab, activeVoiceCard, searchValue]);

	return {
		data,
		loading,
		fetchActivityLogs,
	};
};
export default useGetOmnichannelActivityLogs;
