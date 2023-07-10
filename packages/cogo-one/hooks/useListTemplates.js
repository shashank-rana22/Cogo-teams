import getGeoConstants from '@cogoport/globalization/constants/geo';
import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { isEmpty } from '@cogoport/utils';
import { useEffect, useState, useCallback } from 'react';

import { VIEW_TYPE_GLOBAL_MAPPING } from '../constants/viewTypeMapping';

const FIRST_PAGE = 1;
const SCROLL_HEIGHT = 50;

function useListTemplate({ viewType }) {
	const geo = getGeoConstants();

	const { userRoleIds, userId } = useSelector(({ profile }) => ({
		userRoleIds : profile.partner?.user_role_ids || [],
		userId      : profile?.user?.id,
	}));

	const isomniChannelAdmin = userRoleIds?.some((eachRole) => geo.uuid.cogo_one_admin_ids.includes(eachRole)) || false;
	const [qfilter, setQfilter] = useState('');
	const [pagination, setPagination] = useState(FIRST_PAGE);
	const [infiniteList, setInfiniteList] = useState({
		list  : [],
		total : 0,
	});

	const [{ loading }, trigger] = useRequest({
		url    : '/list_communication_templates',
		method : 'get',
	}, { manual: true });

	const fetchListTemplate = useCallback(async () => {
		try {
			const res = await trigger({
				params: {
					page                     : pagination,
					pagination_data_required : true,
					filters                  : {
						q                : !isEmpty(qfilter?.trim()) ? qfilter?.trim() : undefined,
						type             : 'whatsapp',
						tags             : VIEW_TYPE_GLOBAL_MAPPING[viewType]?.show_relevant_templates,
						performed_by_ids : !isomniChannelAdmin ? [userId] : undefined,
					},
				},
			});
			if (res?.data) {
				const { list = [], ...paginationData } = res?.data || {};
				setInfiniteList((p) => ({ list: [...(p.list || []), ...(list || [])], ...paginationData }));
			}
		} catch (error) {
			console.error(error);
		}
	}, [trigger, pagination, qfilter, viewType, isomniChannelAdmin, userId]);

	useEffect(() => {
		setInfiniteList((p) => ({ ...p, list: [] }));
		setPagination(FIRST_PAGE);
	}, [qfilter]);

	useEffect(() => {
		fetchListTemplate();
	}, [fetchListTemplate]);

	const handleScroll = (clientHeight, scrollTop, scrollHeight) => {
		const reachBottom = scrollHeight - (clientHeight + scrollTop) <= SCROLL_HEIGHT;
		const hasMoreData = pagination < infiniteList?.total;
		if (reachBottom && hasMoreData && !loading) {
			setPagination((p) => p + FIRST_PAGE);
		}
	};
	const refetch = () => {
		setInfiniteList((p) => ({ ...p, list: [] }));
		if (pagination === FIRST_PAGE) {
			fetchListTemplate();
		} else {
			setPagination(FIRST_PAGE);
		}
	};

	return {
		setQfilter, handleScroll, qfilter, infiniteList, loading, refetch,
	};
}

export default useListTemplate;
