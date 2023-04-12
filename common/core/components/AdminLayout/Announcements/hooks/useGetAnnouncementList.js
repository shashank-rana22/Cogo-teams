import { Toast } from '@cogoport/components';
import { useDebounceQuery } from '@cogoport/forms';
import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { isEmpty } from '@cogoport/utils';
import { useState, useEffect, useCallback } from 'react';

const useGetAnnouncementList = () => {
	const { general = {}, profile = {} } = useSelector((state) => state);

	const [announcementList, setAnnouncementList] = useState({
		list       : [],
		totalCount : 0,
	});
	const [search, setSearch] = useState('');
	const [params, setParams] = useState({
		page    : 1,
		filters : {
			q                 : '',
			toggle            : false,
			announcement_type : '',
		},
	});

	const { query = '', debounceQuery } = useDebounceQuery();

	useEffect(() => {
		debounceQuery(search);
	}, [debounceQuery, search]);

	useEffect(() => {
		setParams((prev) => ({
			page    : 1,
			filters : {
				...prev.filters,
				q: query,
			},
		}));
	}, [query]);

	const { scope = '' } = general || {};

	const { auth_role_data = {}, partner = {}, user } = profile;

	const { id: user_id } = user;

	const { country_id = '', id: cogo_entity_id = '' } = partner;

	const { role_functions = [], role_sub_functions = [] } = auth_role_data || {};

	const roleSubFunction = !isEmpty(role_sub_functions)
		? role_sub_functions
		: undefined;

	const [{ loading }, trigger] = useRequest({
		method : 'GET',
		url    : '/list_announcements',
	}, { manual: true });

	const fetchAnnouncements = useCallback(async () => {
		try {
			const res = await trigger({
				params: {
					filters: {
						q                 : params.filters.q || undefined,
						is_viewed         : params.filters.toggle === true ? false : undefined,
						announcement_type : params.filters.announcement_type || undefined,
						is_live           : true,
						status            : 'active',
						cogo_entity_id,
						...(scope === 'partner'
							? {
								auth_function: !isEmpty(role_functions)
									? role_functions
									: undefined,
								auth_sub_function : roleSubFunction,
								persona           : 'admin_user',
							}
							: { persona: 'importer_exporter' }),
					},
					country_id,
					user_id,
					page       : params.page,
					page_limit : 10,
				},
			});

			const { data = { list: [], total_count: 0 } } = res;

			setAnnouncementList((prevState) => ({
				list:
					params.page === 1
						? data?.list || []
						: [...(prevState.list || []), ...(data?.list || [])],
				totalCount: data?.total_count,
			}));
		} catch (error) {
			Toast.error(error?.message);
		}
	}, [cogo_entity_id, country_id, params.filters.announcement_type, params.filters.q,
		params.filters.toggle, params.page, roleSubFunction, role_functions, scope, trigger, user_id]);

	return {
		fetchAnnouncements,
		announcementLoading   : loading,
		announcementList,
		searchAnnouncement    : search,
		setSearchAnnouncement : setSearch,
		query,
		params,
		setParams,
	};
};

export default useGetAnnouncementList;
