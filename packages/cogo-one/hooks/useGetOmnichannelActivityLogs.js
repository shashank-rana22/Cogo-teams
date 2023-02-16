import { useRequest } from '@cogoport/request';
import { isEmpty } from '@cogoport/utils';
import { useEffect } from 'react';

const useGetOmnichannelActivityLogs = ({ activeMessageCard, activityTab }) => {
	const [{ loading, data }, trigger] = useRequest({
		url    : '/get_omnichannel_activity_logs',
		method : 'get',
	}, { manual: true });

	const fetchActivityLogs = async (filters = []) => {
		await trigger({
			params: {
				user_id       : 'bbde20db-d8b8-4be7-8307-367666847041',
				activity_type : 'all',
			},
		});
	};

	useEffect(() => {
		fetchActivityLogs();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [activeMessageCard]);

	return {
		data,
		pointLoading: loading,
		fetchActivityLogs,
	};
};
export default useGetOmnichannelActivityLogs;
