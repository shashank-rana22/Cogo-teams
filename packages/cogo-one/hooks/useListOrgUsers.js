import { useRequest } from '@cogoport/request';
import { isEmpty } from '@cogoport/utils';
import { useCallback, useEffect, useState } from 'react';

import formatOrganizationUsers from '../helpers/formatOrganizationUsers';

const FIRST_PAGE = 1;
const SCROLL_HEIGHT = 20;

const getParams = ({ organizationId, page, pageLimit }) => ({
	filters    : { organization_id: organizationId },
	page,
	page_limit : pageLimit || undefined,
});

const useListOrgUsers = ({ organizationId = [], pageLimit }) => {
	const [pagination, setPagination] = useState(FIRST_PAGE);
	const [listData, setListData] = useState({
		list  : [],
		total : 0,
	});

	const [{ loading }, trigger] = useRequest({
		url    : '/list_organization_users',
		method : 'get',
	}, { manual: true });

	const getOrganizationUsers = useCallback(async ({ page }) => {
		if (isEmpty(organizationId)) {
			return;
		}

		try {
			const res = await trigger({ params: getParams({ organizationId, page, pageLimit }) });
			setPagination(page);

			if (res?.data) {
				const { list = [], ...paginationData } = res?.data || {};
				setListData((prev) => ({ list: [...(prev.list || []), ...(list || [])], ...paginationData }));
			}
		} catch (err) {
			console.error('err', err);
		}
	}, [organizationId, trigger, pageLimit]);

	const handleScroll = (e) => {
		const { clientHeight, scrollTop, scrollHeight } = e.target;
		const reachBottom = scrollHeight - (clientHeight + scrollTop) <= SCROLL_HEIGHT;
		const hasMoreData = pagination < listData?.total;

		if (reachBottom && hasMoreData && !loading) {
			getOrganizationUsers({ orgId: organizationId, page: pagination + FIRST_PAGE });
		}
	};

	useEffect(() => {
		if (organizationId) {
			setListData((prev) => ({ ...prev, list: [] }));
			getOrganizationUsers({ orgId: organizationId, page: FIRST_PAGE });
		}
	}, [getOrganizationUsers, organizationId]);

	return {
		formattedOrgUsersList: organizationId ? formatOrganizationUsers({ data: listData }) : [],
		loading,
		handleScroll,
	};
};
export default useListOrgUsers;
