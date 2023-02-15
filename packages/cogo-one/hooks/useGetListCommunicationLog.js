import { useRequest } from '@cogoport/request';
import { useEffect } from 'react';

const useGetListCommunicationLog = () => {
	const [{ loading, data }, trigger] = useRequest({
		url    : '/list_organization_communication_log',
		method : 'get',
	}, { manual: true });

	const fetchListLogApi = async () => {
		await trigger({
			params: {
				filters: {
					communication_type : 'meeting',
					organization_id    : '',
				},
			},
		});
	};
	useEffect(() => {
		fetchListLogApi();
	}, []);

	return {
		Listloading : loading,
		listData    : data,
	};
};
export default useGetListCommunicationLog;
