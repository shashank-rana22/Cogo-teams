import { useDebounceQuery } from '@cogoport/forms';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { useRequestBf } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { useEffect, useState } from 'react';

const getParams = ({
	rest = {},
	activeTab,
	isSettlementExecutive,
	query,
	category,
	page,
	pageLimit,
	incidentId,
	startDate,
	urgency,
	endDate,
	entityCode,
	isMyTaskOnly = false,
	userProfile = {
		user: {
			id: '',
		},
	},
}) => ({
	...rest,
	status          : activeTab.toUpperCase(),
	isStatsRequired : true,
	deadlineTag     : urgency === 'urgent' ? 'DELAYED' : undefined,
	role            : isSettlementExecutive ? 'SETTLEMENT_EXECUTIVE' : undefined,
	q               : query !== '' ? query : undefined,
	type            : category,
	pageIndex       : page,
	pageSize        : pageLimit,
	id              : incidentId,
	entityCode,
	createdFrom     : startDate
		? formatDate({
			date       : startDate,
			dateFormat : GLOBAL_CONSTANTS.formats.date['yyyy-MM-dd'],
			timeFormat : GLOBAL_CONSTANTS.formats.time['hh:mm:ss'],
			formatType : 'dateTime',
			separator  : ' ',
		})
		: undefined,
	createdTo: endDate
		? formatDate({
			date       : endDate,
			dateFormat : GLOBAL_CONSTANTS.formats.date['yyyy-MM-dd'],
			timeFormat : GLOBAL_CONSTANTS.formats.time['hh:mm:ss'],
			formatType : 'dateTime',
			separator  : ' ',
		})
		: undefined,
	toBeApprovedBy: isMyTaskOnly ? userProfile.user?.id : undefined,
});

const useGetIncidentData = ({ activeTab, incidentId, entityCode }) => {
	const { user_profile: userProfile } = useSelector(({ profile }) => ({
		user_profile: profile,
	}));

	const isSettlementExecutive = userProfile.partner.user_role_ids.includes(
		GLOBAL_CONSTANTS.country_entity_ids.IN,
	);

	const [filters, setFilters] = useState({
		page        : 1,
		pageLimit   : 10,
		activeTab,
		searchQuery : '',
	});
	const {
		search, category, date, page, urgency, pageLimit, isMyTaskOnly = false, ...rest
	} =		filters || {};

	const [{ data, loading }, trigger] = useRequestBf(
		{
			url     : '/incident-management/incident/list',
			method  : 'get',
			authKey : 'get_incident_management_incident_list',
		},
		{ manual: true, autoCancel: false },
	);

	const { query = '', debounceQuery } = useDebounceQuery();

	useEffect(() => {
		debounceQuery(search);
	}, [search, debounceQuery]);

	const clearFilters = () => {
		setFilters({
			page      : 1,
			pageLimit : 10,
			urgency   : undefined,
			category,
			date,
			search,
		});
	};

	useEffect(() => {
		clearFilters();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [activeTab]);

	const getIncidentData = async () => {
		const { startDate, endDate } = date || {};
		if (activeTab === 'controller') return;
		try {
			await trigger({
				params: getParams({
					rest,
					activeTab,
					isSettlementExecutive,
					query,
					category,
					page,
					pageLimit,
					incidentId,
					startDate,
					urgency,
					endDate,
					entityCode,
					isMyTaskOnly,
					userProfile,
				}),
			});
		} catch (err) {
			console.log(err);
		}
	};

	const restParams = JSON.stringify(rest);

	useEffect(() => {
		getIncidentData();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [
		restParams,
		category,
		date,
		query,
		page,
		urgency,
		incidentId,
		activeTab,
		entityCode,
		isMyTaskOnly,
	]);

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
