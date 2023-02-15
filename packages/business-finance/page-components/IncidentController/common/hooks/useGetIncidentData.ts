import { useDebounceQuery } from '@cogoport/forms';
import { useRequestBf } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { format } from '@cogoport/utils';
import { useEffect, useState } from 'react';

import { FilterProps } from '../../interface';

interface Tab {
	activeTab?:string
}
const useGetIncidentData = ({ activeTab }:Tab) => {
	const { user_profile:userProfile } = useSelector(({ profile }) => ({
		user_profile: profile,
	}));
	const isSettlementExecutive = userProfile.partner.user_role_ids.includes(
		global.PROD_SETTLEMENT_EXECUTIVE,

	);
	const [filters, setFilters] = useState<FilterProps>({
		page        : 1,
		pageLimit   : 10,
		activeTab,
		searchQuery : '',
	});
	const {
		search, category, date, page, urgency, pageLimit,
		...rest
	} = filters || {};

	const [
		{ data, loading },
		trigger,
	] = useRequestBf(
		{
			url     : '/incident-management/incident/list',
			method  : 'get',
			authKey : 'get_incident_management_incident_list',
		},
		{ manual: true },
	);

	const { query = '', debounceQuery } = useDebounceQuery();

	useEffect(() => {
		debounceQuery(search);
	}, [search, debounceQuery]);

	const getIncidentData = async () => {
		const { startDate, endDate } = date || {};

		try {
			await trigger({
				params: {
					...rest,
					status          : activeTab.toUpperCase(),
					isStatsRequired : true,
					urgencyTag      : urgency === 'urgent' ? 'ALL' : undefined,
					role            : isSettlementExecutive ? 'SETTLEMENT_EXECUTIVE' : undefined,
					q               : query !== '' ? query : undefined,
					type            : category,
					pageIndex       : page,
					pageSize        : pageLimit,
					createdFrom     : startDate
						? format(startDate, 'yyyy-MM-dd', {}, false)
						: undefined,
					createdTo: endDate
						? format(endDate, 'yyyy-MM-dd', {}, false)
						: undefined,
				},
			});
		} catch (err) {
			console.log(err, 'err');
		}
	};

	useEffect(() => {
		getIncidentData();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [JSON.stringify(rest), category, date, query, page, urgency]);

	useEffect(() => {
		setFilters((prev) => ({
			...prev,
			activeTab,
			searchQuery : query,
			page        : 1,
		}));
	}, [activeTab, query]);

	return {
		isSettlementExecutive,
		incidentLoading : loading,
		incidentData    : data,
		setFilters,
		filters,
		getIncidentData,
	};
};

export default useGetIncidentData;
