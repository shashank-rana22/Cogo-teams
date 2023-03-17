import { useRequest } from '@cogoport/request';
import { isEmpty } from '@cogoport/utils';
import { useEffect, useState, useCallback } from 'react';

const useGetOmnichannelActivityLogs = ({
	activityTab = '',
	setFilterVisible,
	customerId,
	user_id = null,
	lead_user_id = null,
	activeSubTab = '',
	pagination,
}) => {
	const [filters, setFilters] = useState(null);
	const [{ loading, data }, trigger] = useRequest({
		url    : '/get_omnichannel_activity_logs',
		method : 'get',
	}, { manual: true });
	const fetchActivityLogs = useCallback(async () => {
		try {
			await trigger({
				params: {
					user_id       : user_id || undefined,
					lead_user_id  : !user_id ? lead_user_id : undefined,
					activity_type : activityTab,
					page          : pagination,
					c_filters:
						!isEmpty(filters) && activityTab === 'communication' ? { type: filters } : undefined,

					t_filters: !isEmpty(filters) && activityTab === 'transactional' ? {
						serial_id: filters.toString(),
					} : undefined,

				},
			});
		} catch (error) {
			// console.log(error);
		}

		setFilterVisible(false);
	}, [activityTab, filters, lead_user_id, pagination, setFilterVisible, trigger, user_id]);

	useEffect(() => {
		if ((user_id || lead_user_id)
		&& (activeSubTab === 'channels')) {
			fetchActivityLogs();
		}
	}, [activeSubTab, user_id, lead_user_id, fetchActivityLogs, customerId, pagination]);

	return {
		data,
		loading,
		fetchActivityLogs,
		filters,
		setFilters,
	};
};

export default useGetOmnichannelActivityLogs;
