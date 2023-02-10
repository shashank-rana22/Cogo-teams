import { useDebounceQuery } from '@cogoport/forms';
import { useRequestBf } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { format } from '@cogoport/utils';
import { useEffect, useState } from 'react';

import { FilterProps, Tab } from '../../interface';

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
		search, category, date,
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
		try {
			await trigger({
				params: {
					...rest,
					status          : activeTab.toUpperCase(),
					isStatsRequired : true,
					role            : isSettlementExecutive ? 'SETTLEMENT_EXECUTIVE' : undefined,
					q               : query !== '' ? query : undefined,
					type            : category,
					createdFrom     : date?.startDate
						? format(date?.startDate, 'yyyy-MM-dd 00:00:00')
						: undefined,
					createdTo: date?.endDate
						? format(date?.endDate, 'yyyy-MM-dd 23:59:59')
						: undefined,
				},
			});
		} catch (err) {
			console.log(err, 'err');
		}
	};

	useEffect(() => {
		getIncidentData();
	}, [JSON.stringify(rest), category, date, query]);

	useEffect(() => {
		setFilters({
			...filters,
			activeTab,
			searchQuery : query,
			page        : 1,
		});
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
