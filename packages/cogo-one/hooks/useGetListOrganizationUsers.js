import { useRequest } from '@cogoport/request';
import { useEffect, useCallback, useState } from 'react';

const FIRST_PAGE = 1;
const SCROLL_HEIGHT = 0;

const getPayload = ({ organizationId = '', pagination }) => ({
	filters: {
		organization_id: organizationId,
	},
	page: pagination,
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

	const listOrganizationsUsers = useCallback(async () => {
		try {
			const res = await trigger({
				params: getPayload({ organizationId, pagination }),
			});

			if (res?.data) {
				const { list = [], ...paginationData } = res?.data || {};
				setListData((p) => ({ list: [...(p.list || []), ...(list || [])], ...paginationData }));
			}
		} catch (error) {
			console.error(error);
		}
	}, [organizationId, pagination, trigger]);

	const handleScroll = (clientHeight, scrollTop, scrollHeight) => {
		const reachBottom = scrollHeight - (clientHeight + scrollTop) <= SCROLL_HEIGHT;
		const hasMoreData = pagination < listData?.total;

		if (reachBottom && hasMoreData && !loading) {
			setPagination((page) => page + FIRST_PAGE);
		}
	};

	useEffect(() => {
		if (isOrgUsersVisible) {
			listOrganizationsUsers();
		}
	}, [isOrgUsersVisible, listOrganizationsUsers]);

	return {
		organizationUsersData    : listData,
		organizationUsersLoading : loading,
		handleScroll,
	};
};

export default useGetListOrganizationUsers;
