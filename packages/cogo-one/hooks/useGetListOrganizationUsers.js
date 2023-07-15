import { useRequest } from '@cogoport/request';
import { useEffect, useCallback, useState } from 'react';

const FIRST_PAGE = 1;
const SCROLL_HEIGHT = 20;

const getPayload = ({ orgId = '', page }) => ({
	filters: {
		organization_id: orgId,
	},
	page,
});

const useGetListOrganizationUsers = ({ organizationId = '', isOrgUsersVisible = false }) => {
	const [pagination, setPagination] = useState(FIRST_PAGE);
	const [listData, setListData] = useState({
		list  : [],
		total : 0,
	});

	const [
		{ loading }, trigger,
	] = useRequest({
		url    : '/list_organization_users',
		method : 'get',
	}, { manual: true });

	const listOrganizationsUsers = useCallback(async ({ orgId, page }) => {
		try {
			const res = await trigger({
				params: getPayload({ orgId, page }),
			});

			setPagination(page);

			if (res?.data) {
				const { list = [], ...paginationData } = res?.data || {};
				setListData((prev) => ({ list: [...(prev.list || []), ...(list || [])], ...paginationData }));
			}
		} catch (error) {
			console.error(error);
		}
	}, [trigger]);

	const handleScroll = (e) => {
		const { clientHeight, scrollTop, scrollHeight } = e.target;
		const reachBottom = scrollHeight - (clientHeight + scrollTop) <= SCROLL_HEIGHT;
		const hasMoreData = pagination < listData?.total;

		if (reachBottom && hasMoreData && !loading) {
			listOrganizationsUsers({ orgId: organizationId, page: pagination + FIRST_PAGE });
		}
	};

	useEffect(() => {
		if (isOrgUsersVisible) {
			setListData((prev) => ({ ...prev, list: [] }));
			listOrganizationsUsers({ orgId: organizationId, page: FIRST_PAGE });
		}
	}, [isOrgUsersVisible, listOrganizationsUsers, organizationId]);

	return {
		organizationUsersData    : listData,
		organizationUsersLoading : loading,
		handleScroll,
	};
};

export default useGetListOrganizationUsers;
