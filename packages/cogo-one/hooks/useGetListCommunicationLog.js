import { useRequest } from '@cogoport/request';
import { useEffect, useState } from 'react';

function useGetListCommunicationLog({ organizationId = null, userId = null }) {
	const [firstLoading, setFirstLoading] = useState(false);
	const [{ loading, data }, trigger] = useRequest({
		url    : '/list_organization_communication_logs',
		method : 'get',
	}, { manual: true });

	const fetchListLogApi = async () => {
		try {
			await trigger({
				params: {
					filters: {
						communication_type : 'meeting',
						organization_id    : organizationId,
					},
				},
			});
			setFirstLoading(false);
		} catch (error) {
			// console.log(error);
		}
	};
	useEffect(() => {
		if (organizationId) {
			setFirstLoading(true);
			fetchListLogApi();
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [organizationId, userId]);

	return {
		listLoading : loading,
		listData    : data,
		fetchListLogApi,
		firstLoading,
		setFirstLoading,
	};
}
export default useGetListCommunicationLog;
