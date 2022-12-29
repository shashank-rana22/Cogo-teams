import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { isEmpty } from '@cogoport/utils';

import useGetFiniteList from './useGetFiniteList';

const useGetSpotSearches = ({ enquiryFilters } = {}) => {
	const { scope, authorizationparameters } = useSelector(
		({ general, profile }) => ({
			scope                   : general.scope,
			authorizationparameters : profile?.authorizationparameters,
			org_id                  : profile?.organization?.id,
		}),
	);

	const [{ loading: apiLoading }, trigger] = useRequest({
		method : 'get',
		url    : '/list_spot_searches',
		scope,
	}, { manual: false });

	const listAPi = (restFilters, currentPage) => {
		const {
			rates_status, service_name, filterMapping, ...filters
		} =			restFilters;

		if (rates_status) {
			filters[rates_status] = true;
		}

		const serviceFilters = {};
		if (!isEmpty(filters?.negotiation_service)) {
			if (Array.isArray(service_name)) {
				serviceFilters[service_name[0]] = filterMapping;
				serviceFilters[service_name[1]] = filterMapping;
			} else {
				serviceFilters[service_name] = filterMapping;
			}
		}

		return trigger({
			params: {
				filters: {
					is_converted_to_negotiation : true,
					negotiation_status          : 'awaiting_responses',
					...(enquiryFilters || {}),
					...(filters || {}),
					is_negotiation_not_reverted : true,
					...serviceFilters,
					sort_by                     : undefined,
					sort_type                   : undefined,
				},

				spot_negotiation_rates_required             : true,
				enquiries_received_dashboard_stats_required : false,
				page                                        : currentPage,
				page_limit                                  : 10,
				sort_by                                     : filters?.sort_by || 'created_at',
				sort_type                                   : filters?.sort_type || 'desc',
			},
		});
	};

	const {
		loading,
		page,
		filters,
		list: {
			data, total, total_page,
		},
		hookSetters,
		refetch,
	} = useGetFiniteList(listAPi, {
		authorizationparameters,
		...(enquiryFilters || {}),
	});

	return {
		loading : loading || apiLoading,
		page,
		filters,
		list    : { data, total, total_page },
		hookSetters,
		refetch,
	};
};
export default useGetSpotSearches;
