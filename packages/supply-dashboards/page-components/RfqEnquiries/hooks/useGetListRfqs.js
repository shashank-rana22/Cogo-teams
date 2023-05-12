import getGeoConstants from '@cogoport/globalization/constants/geo';
import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';

import useGetFiniteList from './useGetFiniteList';

const useGetListRfqs = () => {
	const geo = getGeoConstants();

	const { scope } = useSelector(({ general }) => ({ scope: general.scope }));

	const [{ loading: apiLoading }, trigger] = useRequest({
		method : 'GET',
		url    : '/list_rfqs',
		scope,
	}, { manual: true });

	const { user_profile } = useSelector(({ profile }) => ({
		user_profile: profile,
	}));

	const fullAccessIds = [geo.uuid.super_admin_id, geo.uuid.admin_id];

	const isFullAccess = user_profile.partner.user_role_ids.filter((id) => fullAccessIds.includes(id)).length;

	const listAPi = (restFilters, currentPage) => {
		const { rates_status, ...filters } = restFilters;
		if (rates_status) {
			filters[rates_status] = true;
		}
		return trigger({
			params: {
				filters: {
					...(filters || {}),
					relevant_supply_agent_id : !isFullAccess ? user_profile?.user?.id : undefined,
					supply_agent_preference  : true,
					service_type             : filters.service_type,
					origin_port_id           : filters.origin_port_id ? filters.origin_port_id : undefined,
					destination_port_id      : filters.destination_port_id ? filters.destination_port_id : undefined,
					origin_airport_id        : filters.origin_airport_id ? filters.origin_airport_id : undefined,
					destination_airport_id   : filters.destination_airport_id
						? filters.destination_airport_id : undefined,
					origin_location_id      : filters.origin_location_id ? filters.origin_location_id : undefined,
					destination_location_id : filters.destination_location_id
						? filters.destination_location_id : undefined,
					origin_country_id      : filters.origin_country_id ? filters.origin_country_id : undefined,
					destination_country_id : filters.destination_country_id
						? filters?.destination_country_id : undefined,
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
