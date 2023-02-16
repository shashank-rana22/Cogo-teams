import { useRequest } from '@cogoport/request';
import { useEffect } from 'react';

function useGetListCommunicationLog({ activeMessageCard, activeTab, activeVoiceCard }) {
	const { organization_id } = activeVoiceCard || {};
	const { organization_id: MessageOrgId } = activeMessageCard || {};
	const [{ loading, data }, trigger] = useRequest({
		url    : '/list_organization_communication_logs',
		method : 'get',
	}, { manual: true });

	const fetchListLogApi = async () => {
		let id;
		if (activeTab === 'voice') {
			id = organization_id;
		} else {
			id = MessageOrgId;
		}
		await trigger({
			params: {
				filters: {
					communication_type : 'meeting',
					organization_id    : id,
				},
			},
		});
	};
	useEffect(() => {
		fetchListLogApi();
	}, [activeMessageCard, activeVoiceCard]);

	return {
		listLoading : loading,
		listData    : data,
		fetchListLogApi,
	};
}
export default useGetListCommunicationLog;
