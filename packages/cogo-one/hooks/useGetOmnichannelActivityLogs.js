import { useRequest } from '@cogoport/request';
import { isEmpty } from '@cogoport/utils';
import { useEffect, useState } from 'react';

import getActiveCardDetails from '../utils/getActiveCardDetails';

const useGetOmnichannelActivityLogs = ({
	activeMessageCard = {},
	activityTab = '',
	activeVoiceCard = {},
	activeTab,
}) => {
	const { user_id:userVoiceId = '' } = activeVoiceCard;

	const userData = getActiveCardDetails(activeMessageCard);

	const { user_id: userMessageId = '' } = userData || {};

	const [pagination, setPagination] = useState(1);

	const [{ loading, data }, trigger] = useRequest({
		url    : '/get_omnichannel_activity_logs',
		method : 'get',
	}, { manual: true });

	const fetchActivityLogs = async (filters = []) => {
		let values = {};

		filters.forEach((item) => { values = { ...values, [item]: true }; });

		await trigger({
			params: {
				user_id       : activeTab === 'message' ? userMessageId : userVoiceId,
				// activity_type : activityTab,
				activity_type : 'transactional',
				page          : pagination,
				c_filters     : !isEmpty(filters) && activityTab === 'communication' ? { type: filters } : undefined,
				t_filters     : !isEmpty(filters) && activityTab === 'transactional' ? values : undefined,

			},
		});
	};

	useEffect(() => {
		fetchActivityLogs();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [activeMessageCard, activityTab, activeVoiceCard, pagination]);

	return {
		data,
		loading,
		fetchActivityLogs,
		setPagination,
	};
};

export default useGetOmnichannelActivityLogs;
