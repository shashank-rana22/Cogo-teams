import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';

import useGetFiniteList from './useGetFiniteList';

const useGetListRfqs = () => {
	const { scope } = useSelector(({ general }) => ({ scope: general.scope }));

	const [{ loading: apiLoading }, trigger] = useRequest({
		method : 'GET',
		url    : '/list_rfqs',
		scope,
	}, { manual: false });
	const { user_profile } = useSelector(({ profile }) => ({
		user_profile: profile,
	}));

	const listAPi = (restFilters, currentPage) => {
		const { rates_status, ...filters } = restFilters;
		if (rates_status) {
			filters[rates_status] = true;
		}
		return trigger({
			params: {
				filters: {
					...(filters || {}),
					relevant_supply_agent_id : user_profile?.user?.id,
					service_type             : filters.service_type,
				},
				sort_by                          : 'updated_at',
				created_by_user_details_required : true,
				page                             : currentPage,
			},
		});
	};

	const {
		loading,
		page,
		filters,
		list: { data, total, total_page },
		hookSetters,
		refetch,
	} = useGetFiniteList(listAPi);

	return {
		loading : loading || apiLoading,
		page,
		filters,
		list    : { data, total, total_page },
		hookSetters,
		refetch,
	};
};
export default useGetListRfqs;
