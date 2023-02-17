import { useRequest } from '@cogoport/request';
import { useEffect, useState } from 'react';

import getActiveCardDetails from '../utils/getActiveCardDetails';

const useGetOmnichannelActivityLogs = ({
	activeMessageCard = {},
	activityTab = '',
	searchValue = '',
	activeVoiceCard = {},
	activeTab,
}) => {
	const { user_id:userVoiceId = '' } = activeVoiceCard;
	const userData = getActiveCardDetails(activeMessageCard);

	const { user_id: userMessageId = '' } = userData || {};

	const [listData, setListData] = useState({
		list  : [],
		total : 0,
	});
	const [pagination, setPagination] = useState(1);

	const [{ loading }, trigger] = useRequest({
		url    : '/get_omnichannel_activity_logs',
		method : 'get',
	}, { manual: true });

	const fetchActivityLogs = async (filters = []) => {
		const res = await trigger({
			params: {
				user_id : activeTab === 'message' ? userMessageId : userVoiceId,
				// activity_type : activityTab,
				page    : pagination,
			},
		});

		if (res.data) {
			const { list = [], ...paginationData } = res?.data || {};
			setListData((p) => ({ list: [...(p.list || []), ...(list || [])], ...paginationData }));
		}
	};

	const handleScroll = (clientHeight, scrollTop, scrollHeight) => {
		const reachBottom = scrollHeight - (clientHeight + scrollTop) <= 0;
		const hasMoreData = pagination < listData?.total;

		if (reachBottom && hasMoreData && !loading) {
			setPagination((p) => p + 1);
		}
	};

	useEffect(() => {
		fetchActivityLogs();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [activeMessageCard, activityTab, activeVoiceCard, searchValue, pagination]);

	return {
		data: listData,
		handleScroll,
		loading,
		fetchActivityLogs,
	};
};
export default useGetOmnichannelActivityLogs;
