import { useRequest } from '@cogoport/request';
import { useEffect, useCallback } from 'react';

const getParams = ({ partnerId, userId }) => ({
	partner_id : partnerId,
	user_id    : userId,
});

const useOrganizationRMMapping = ({
	partnerId = '',
	userId = '',
	nextViewType = '',
}) => {
	const [{ loading = false, data }, trigger] = useRequest({
		url    : 'get_partner_user_rm_mapping',
		method : 'GET',
	}, { manual: true });

	const fetchData = useCallback(
		async () => {
			try {
				if (nextViewType !== 'users' || !userId || !partnerId) {
					return;
				}

				await trigger({
					params: getParams({ partnerId, userId }),
				});
			} catch (err) {
				console.error('error', err);
			}
		},
		[nextViewType, partnerId, trigger, userId],
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
