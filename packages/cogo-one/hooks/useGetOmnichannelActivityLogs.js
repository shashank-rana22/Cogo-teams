import { useRequest } from '@cogoport/request';
import { isEmpty } from '@cogoport/utils';
import { useEffect, useState } from 'react';

import FormatData from '../utils/formatData';

const useGetOmnichannelActivityLogs = ({
	activeMessageCard = {},
	activityTab = '',
	activeVoiceCard = {},
	activeTab,
	setFilterVisible,
	customerId,
}) => {
	const [pagination, setPagination] = useState(1);

	const [{ loading, data }, trigger] = useRequest({
		url    : '/get_omnichannel_activity_logs',
		method : 'get',
	}, { manual: true });

	const { userId = '', leadUserId = '' } = FormatData({
		activeMessageCard,
		activeVoiceCard,
		activeTab,
	});

	const emptyCheck = isEmpty(userId) && isEmpty(leadUserId);

	const fetchActivityLogs = async (filters = []) => {
		const lead_user_id = !isEmpty(leadUserId) ? leadUserId : undefined;
		try {
			await trigger({
				params: {
					user_id       : !isEmpty(userId) ? userId : undefined,
					lead_user_id  : isEmpty(userId) ? lead_user_id : undefined,
					activity_type : activityTab,
					page          : pagination,
					c_filters     : !isEmpty(filters) && activityTab === 'communication' ? { type: filters } : undefined,
					t_filters     : !isEmpty(filters) && activityTab === 'transactional' ? {
						serial_id: filters.toString(),
					} : undefined,

				},
			});
		} catch (error) {
			console.log(error);
		}

		setFilterVisible(false);
	};

	useEffect(() => {
		if (activeTab === 'message') {
			if (!emptyCheck) {
				fetchActivityLogs();
			}
		} else if (activeTab === 'voice') {
			if (!isEmpty(userId)) {
				fetchActivityLogs();
			}
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [activityTab, customerId, pagination]);

	return {
		data,
		loading,
		fetchActivityLogs,
		pagination,
		setPagination,
	};
};

export default useGetOmnichannelActivityLogs;
