import getGeoConstants from '@cogoport/globalization/constants/geo';
import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { useEffect, useState, useCallback } from 'react';

import { VIEW_TYPE_GLOBAL_MAPPING } from '../constants/viewTypeMapping';

const DEFAULT_PAGE = 1;
const SCROLL_HEIGHT = 50;

const getParams = ({ pagination, qfilter, viewType, userId, isomniChannelAdmin }) => ({
	page                     : pagination,
	pagination_data_required : true,
	filters                  : {
		q                : qfilter?.trim() || undefined,
		type             : 'whatsapp',
		tags             : VIEW_TYPE_GLOBAL_MAPPING[viewType]?.show_relevant_templates,
		performed_by_ids : !isomniChannelAdmin ? [userId] : undefined,
	},
});

function useListTemplate({ viewType }) {
	const { userRoleIds, userId } = useSelector(({ profile }) => ({
		userRoleIds : profile.partner?.user_role_ids || [],
		userId      : profile?.user?.id,
	}));

	const [qfilter, setQfilter] = useState('');
	const [pagination, setPagination] = useState(DEFAULT_PAGE);
	const [infiniteList, setInfiniteList] = useState({
		list  : [],
		total : 0,
	});

	const geo = getGeoConstants();

	const isomniChannelAdmin = userRoleIds?.some((eachRole) => geo.uuid.cogo_one_admin_ids.includes(eachRole)) || false;

	const [{ loading }, trigger] = useRequest({
		url    : '/list_communication_templates',
		method : 'get',
	}, { manual: true });

	const fetchListTemplate = useCallback(async () => {
		try {
			const res = await trigger({
				params: getParams({ pagination, qfilter, viewType, userId, isomniChannelAdmin }),
			});
			if (res?.data) {
				const { list = [], ...paginationData } = res?.data || {};
				setInfiniteList((previous) => ({
					list: [...(previous.list || []),
						...(list || [])],
					...paginationData,
				}));
			}
		} catch (error) {
			console.error(error);
		}
	}, [trigger, pagination, qfilter, viewType, isomniChannelAdmin, userId]);

	useEffect(() => {
		setInfiniteList((previous) => ({ ...previous, list: [] }));
		setPagination(DEFAULT_PAGE);
	}, [qfilter]);

	useEffect(() => {
		fetchListTemplate();
	}, [fetchListTemplate]);

	const handleScroll = (clientHeight, scrollTop, scrollHeight) => {
		const reachBottom = scrollHeight - (clientHeight + scrollTop) <= SCROLL_HEIGHT;
		const hasMoreData = pagination < infiniteList?.total;
		if (reachBottom && hasMoreData && !loading) {
			setPagination((previous) => previous + DEFAULT_PAGE);
		}
	};
	const refetch = () => {
		setInfiniteList((previous) => ({ ...previous, list: [] }));
		if (pagination === DEFAULT_PAGE) {
			fetchListTemplate();
		} else {
			setPagination(DEFAULT_PAGE);
		}
	};

	return {
		setQfilter, handleScroll, qfilter, infiniteList, loading, refetch,
	};
}

export default useListTemplate;
