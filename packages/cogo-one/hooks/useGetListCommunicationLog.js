import { useRequest } from '@cogoport/request';
import { useEffect } from 'react';

import FormatData from '../utils/formatData';

function useGetListCommunicationLog({ activeMessageCard, activeVoiceCard }) {
	const {
		orgId = '',
	} = FormatData({ activeMessageCard, activeVoiceCard });
	const [{ loading, data }, trigger] = useRequest({
		url    : '/list_organization_communication_logs',
		method : 'get',
	}, { manual: true });

	const fetchListLogApi = async () => {
		await trigger({
			params: {
				filters: {
					communication_type : 'meeting',
					organization_id    : orgId,
				},
			},
		});
	};
	useEffect(() => {
		if (orgId !== '') {
			fetchListLogApi();
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [activeMessageCard, activeVoiceCard]);

	return {
		listLoading : loading,
		listData    : data,
		fetchListLogApi,
	};
}
export default useGetListCommunicationLog;
