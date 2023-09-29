import { useRequest } from '@cogoport/request';
import { useCallback, useEffect } from 'react';

const getPayload = ({ groupId = '' }) => ({
	filters: {
		cogoone_group_id : groupId,
		status           : 'active',
	},
	partner_data_required : true,
	page_limit            : 100,
});

const useListCogooneGroupMembers = ({ groupId = '' }) => {
	const [{ loading, data }, trigger] = useRequest({
		url    : '/list_cogoone_group_members',
		method : 'get',
	}, { manual: true });

	const fetchPartnerId = useCallback(() => {
		try {
			trigger({
				params: getPayload({ groupId }),
			});
		} catch (error) {
			console.error('error', error);
		}
	}, [groupId, trigger]);

	useEffect(() => {
		fetchPartnerId();
	}, [fetchPartnerId]);

	return {
		loading,
		fetchPartnerId,
		listData: loading ? {} : data,
	};
};
export default useListCogooneGroupMembers;
