import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';

import useGetFiniteList from './useGetFiniteList';

const useGetListRfqs = () => {
	const { scope } = useSelector(({ general }) => ({ scope: general.scope }));

	const [{ loading: apiLoading }, trigger] = useRequest({
		method : 'get',
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
					negotiation_status    : 'awaiting_responses',
					...(filters || {}),
					service_type          : undefined,
					relevent_supply_agent : user_profile?.id,
				},
				created_by_user_details_required : true,
				page                             : currentPage,
				service_type                     : filters.service_type || 'fcl_freight',
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
