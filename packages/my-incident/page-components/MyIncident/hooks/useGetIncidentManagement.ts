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
			authKey : 'get_incident_management_incident_list',
		},
		{ manual: true, autoCancel: false },
	);

	const { user: { id:userId = '' } } = UserData;

	const [globalFilters, setGlobalFilters] = useState({
		pageIndex      : 1,
		search         : undefined,
		type           : undefined,
		request_type   : undefined,
		Date           : undefined,
		urgency        : undefined,
		rejectedStatus : undefined,

	});

	const { search, type, request_type:requestType, urgency, rejectedStatus, Date, ...rest } = globalFilters;

	const { startDate, endDate } = Date || {};
	const { query = '', debounceQuery } = useDebounceQuery();

	useEffect(() => {
		debounceQuery(search);
	}, [search]);

	let activeStatus = [];
	if (payload?.[0] === 'raisedPayload') {
		activeStatus = undefined;
	} else if (activeTab === 'requested') {
		activeStatus = ['REQUESTED'];
	} else if (activeTab === 'approved') {
		activeStatus = ['APPROVED'];
	} else if (activeTab === 'rejected') {
		activeStatus = ['PENDING_ACTION', 'RAISED_AGAIN', 'CLOSED', 'DELETED'];
	}

	const refetch = async () => {
		try {
			await trigger({
				params: {
					...rest,
					sourceDashboard    : 'USER',
					userIncidentStatus : rejectedStatus || activeStatus,
					deadlineTag        : urgency === 'urgent' ? 'DELAYED' : undefined,
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
	}, [JSON.stringify(rest), activeTab, query, requestType, Date, rejectedStatus, urgency]);

	const filtervalue = Object.values(globalFilters);

	const filterClear = filtervalue.filter((item) => {
		if (Array.isArray(item) && item.length === 0) {
			return false;
		}
		return item !== undefined && item !== '';
	});

	const clearFilters = () => {
		setGlobalFilters({
			pageIndex      : 1,
			search,
			type,
			request_type   : requestType,
			Date,
			rejectedStatus : undefined,
			urgency        : undefined,
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
