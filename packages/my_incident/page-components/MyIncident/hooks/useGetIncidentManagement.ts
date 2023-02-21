/* eslint-disable react-hooks/exhaustive-deps */
import { Toast } from '@cogoport/components';
import useDebounceQuery from '@cogoport/forms/hooks/useDebounceQuery';
import { useRequestBf } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { format } from '@cogoport/utils';
import { useEffect, useState } from 'react';

interface ItemProps {
	activeTab:string,
	payload:string
}
const useGetIncidentMangement = ({ activeTab, payload }:ItemProps) => {
	const {
		user_data:UserData,
	} = useSelector(({ profile }) => ({
		user_data: profile || {},
	}));

	const [
		{ data, loading },
		trigger,
	] = useRequestBf(
		{
			url     : '/incident-management/incident/list',
			method  : 'get',
			authkey : 'get_incident_management_incident_list',
		},
		{ manual: true },
	);

	const { user: { id:userId = '' } } = UserData;

	const [globalFilters, setGlobalFilters] = useState({
		pageIndex       : 1,
		search          : undefined,
		type            : undefined,
		request_type    : undefined,
		Date            : undefined,
		requestedStatus : undefined,
		rejectedStatus  : undefined,

	});

	const { search, type, request_type:requestType, requestedStatus, rejectedStatus, Date, ...rest } = globalFilters;

	const { startDate, endDate } = Date || {};
	const { query = '', debounceQuery } = useDebounceQuery();

	useEffect(() => {
		debounceQuery(search);
	}, [search]);

	let activeStatus = [];
	if (payload?.[0] === 'raisedPayload') {
		activeStatus = undefined;
	} else if (activeTab === 'requested') {
		activeStatus = ['REQUESTED', 'DELETED'];
	} else if (activeTab === 'approved') {
		activeStatus = ['APPROVED'];
	} else if (activeTab === 'rejected') {
		activeStatus = ['PENDING_ACTION', 'RAISED_AGAIN', 'ACCEPTED'];
	}

	const refetch = async () => {
		try {
			await trigger({
				params: {
					...rest,
					sourceDashboard    : 'USER',
					userIncidentStatus : requestedStatus || rejectedStatus || activeStatus,
					isStatsRequired    : true,
					createdBy          : payload?.[0] === 'raisedPayload' ? payload?.[2] : userId,
					id                 : payload?.[0] === 'raisedPayload' ? payload?.[1] : undefined,
					pageIndex          : globalFilters.pageIndex,
					q                  : query !== '' ? query : undefined,
					type               : requestType,
					createdFrom        : startDate ? format(startDate as Date, 'yyyy-MM-dd 00:00:00', {}, false)
						: undefined,
					createdTo: endDate
						? format(endDate as Date, 'yyyy-MM-dd 00:00:00', {}, false) : undefined,
				},
			});
		} catch (err) {
			if (!loading) {
				Toast.error(err?.response?.data?.message || 'Something went Wrong');
			}
		}
	};

	useEffect(() => {
		refetch();
	}, [JSON.stringify(rest), activeTab, query, requestType, Date, rejectedStatus, requestedStatus]);

	const filtervalue = Object.values(globalFilters);

	const filterClear = filtervalue.filter((item) => {
		if (Array.isArray(item) && item.length === 0) {
			return false;
		}
		return item !== undefined && item !== '';
	});

	const clearFilters = () => {
		setGlobalFilters({
			pageIndex       : 1,
			search,
			type,
			request_type    : requestType,
			Date,
			rejectedStatus  : undefined,
			requestedStatus : undefined,
		});
	};

	useEffect(() => {
		clearFilters();
	}, [activeTab]);

	return {
		data,
		loading,
		globalFilters,
		setGlobalFilters,
		refetch,
		filterClear,
		clearFilters,
	};
};
export default useGetIncidentMangement;
