import getGeoConstants from '@cogoport/globalization/constants/geo';
import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { isEmpty } from '@cogoport/utils';
import { useEffect, useState, useCallback } from 'react';

function useListTemplate() {
	const geo = getGeoConstants();

	const [{ loading }, trigger] = useRequest({
		url    : '/list_communication_templates',
		method : 'get',
	}, { manual: true });

	const { userRoleIds, userId } = useSelector(({ profile }) => ({
		userRoleIds : profile.partner?.user_role_ids || [],
		userId      : profile?.user?.id,
	}));

	const omniChannelAdminIds = [
		geo.uuid.super_admin_id,
		geo.uuid.tech_super_admin_id,
		geo.uuid.cogoverse_admin,
	];

	const isomniChannelAdmin = userRoleIds?.some((eachRole) => omniChannelAdminIds.includes(eachRole)) || false;
	const [qfilter, setQfilter] = useState('');
	const [pagination, setPagination] = useState(1);
	const [infiniteList, setInfiniteList] = useState({
		list  : [],
		total : 0,
	});

	const fetchListTemplate = useCallback(async () => {
		try {
			const res = await trigger({
				params: {
					page                     : pagination,
					pagination_data_required : true,
					filters                  : {
						q                : !isEmpty(qfilter?.trim()) ? qfilter?.trim() : undefined,
						type             : 'whatsapp',
						tags             : ['quick_reply'],
						performed_by_ids : !isomniChannelAdmin ? [userId] : undefined,
					},
				},
			});
			if (res?.data) {
				const { list = [], ...paginationData } = res?.data || {};
				setInfiniteList((p) => ({ list: [...(p.list || []), ...(list || [])], ...paginationData }));
			}
		} catch (error) {
			// console.log(error);
		}
	}, [pagination, qfilter, trigger, userId, isomniChannelAdmin]);

	useEffect(() => {
		setInfiniteList((p) => ({ ...p, list: [] }));
		setPagination(1);
	}, [qfilter]);

	useEffect(() => {
		fetchListTemplate();
	}, [fetchListTemplate]);

	const handleScroll = (clientHeight, scrollTop, scrollHeight) => {
		const reachBottom = scrollHeight - (clientHeight + scrollTop) <= 50;
		const hasMoreData = pagination < infiniteList?.total;
		if (reachBottom && hasMoreData && !loading) {
			setPagination((p) => p + 1);
		}
	};
	const refetch = () => {
		setInfiniteList((p) => ({ ...p, list: [] }));
		if (pagination === 1) {
			fetchListTemplate();
		} else {
			setPagination(1);
		}
	};

	return {
		setQfilter, handleScroll, qfilter, infiniteList, loading, refetch,
	};
}

export default useListTemplate;
