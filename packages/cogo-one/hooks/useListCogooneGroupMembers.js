import { useRequest } from '@cogoport/request';
import { useCallback } from 'react';

const getPayload = ({ groupId = '' }) => ({
	filters: {
		cogoone_group_id : groupId,
		status           : 'active',
	},
	page_limit: 100,
});

const useListCogooneGroupMembers = () => {
	const [{ loading, data }, trigger] = useRequest({
		url    : '/list_cogoone_group_members',
		method : 'get',
	}, { manual: true });

	const fetchPartnerId = useCallback(({ groupId }) => {
		try {
			trigger({
				params: getPayload({ groupId }),
			});
		} catch (error) {
			console.error('error', error);
		}
	}, [trigger]);

	return {
		loading,
		fetchPartnerId,
		listData: loading ? {} : data,
	};
};
export default useListCogooneGroupMembers;
