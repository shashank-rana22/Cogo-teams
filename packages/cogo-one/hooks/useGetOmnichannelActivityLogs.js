import { useRequest } from '@cogoport/request';
import { isEmpty } from '@cogoport/utils';
import { useEffect } from 'react';

const useGetOmnichannelActivityLogs = ({
	activeMessageCard = {},
	activityTab = '',
	searchValue = '',
	activeVoiceCard = {},
}) => {
	console.log('activeMessageCard', activeMessageCard);
	console.log('activityTab', activityTab);
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

	useEffect(() => {
		fetchActivityLogs();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [activeMessageCard, activityTab, activeVoiceCard, searchValue]);

	return {
		data,
		pointLoading: loading,
		fetchActivityLogs,
	};
};
export default useGetOmnichannelActivityLogs;
