import { useRequest } from '@cogoport/request';
import { isEmpty } from '@cogoport/utils';
import { useEffect, useState } from 'react';

const useGetOmnichannelActivityLogs = ({
	activityTab = '',
	setFilterVisible,
	customerId,
	user_id = null,
	lead_user_id = null,
	activeSubTab = '',
}) => {
	const [pagination, setPagination] = useState(1);

	const [{ loading, data }, trigger] = useRequest({
		url    : '/get_omnichannel_activity_logs',
		method : 'get',
	}, { manual: true });

	const fetchActivityLogs = async (filters = []) => {
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
	};

	useEffect(() => {
		if ((user_id || lead_user_id) && (activeSubTab === 'channels')) {
			fetchActivityLogs();
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [activityTab, customerId, pagination, activeSubTab]);

	return {
		data,
		loading,
		fetchActivityLogs,
		pagination,
		setPagination,
	};
};

export default useGetOmnichannelActivityLogs;
