import { useRequest } from '@cogoport/request';
import { useEffect, useCallback } from 'react';

const getParams = ({ partnerId, userId }) => ({
	partner_id : partnerId,
	user_id    : userId,
});

const useOrganizationRMMapping = ({
	partnerId = '',
	userId = '',
}) => {
	const [{ loading = false, data }, trigger] = useRequest({
		url    : 'get_partner_user_rm_mapping',
		method : 'GET',
	}, { manual: false });

	const fetchData = useCallback(
		async () => {
			try {
				await trigger({
					params: getParams({ partnerId, userId }),
				});
			} catch (err) {
				console.error('err', err);
			}
		},
		[partnerId, trigger, userId],
	);

	useEffect(() => {
		fetchData();
	}, [fetchData]);

	return {
		userHierarchyLoading : loading,
		userHierarchyData    : data,
	};
};

export default useOrganizationRMMapping;
