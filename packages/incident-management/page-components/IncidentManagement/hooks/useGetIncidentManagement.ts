/* eslint-disable react-hooks/exhaustive-deps */
import { Toast } from '@cogoport/components';
import useDebounceQuery from '@cogoport/forms/hooks/useDebounceQuery';
import { useRouter } from '@cogoport/next';
import { useRequestBf } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { format } from '@cogoport/utils';
import { useEffect, useState } from 'react';

interface ItemProps {
	activeTab:string,
}
const useGetIncidentMangement = ({ activeTab }:ItemProps) => {
	const {
		user_data:UserData,
	} = useSelector(({ profile }) => ({
		user_data: profile || {},
	}));
	const { query: queryData } = useRouter();

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
		pageIndex    : 1,
		search       : undefined,
		type         : undefined,
		request_type : undefined,
		Date         : undefined,
		status       : undefined,

	});
	const { search, type, request_type:requestType, Date, status, ...rest } = globalFilters;

	const { startDate, endDate } = Date || {};
	const { query = '', debounceQuery } = useDebounceQuery();

	useEffect(() => {
		debounceQuery(search);
	}, [search]);

	let activeStatus = [];
	if (queryData.userIncidentStatus) {
		activeStatus = ['REQUESTED'];
	} else if (activeTab === 'requested') {
		activeStatus = ['REQUESTED', 'DELETED'];
	} else if (activeTab === 'approved') {
		activeStatus = ['APPROVED'];
	} else if (activeTab === 'rejected') {
		activeStatus = ['PENDING_ACTION', 'RAISED_AGAIN', 'ACCEPTED'];
	}

	const reftech = async () => {
		try {
			await trigger({
				params: {
					...rest,
					flag               : 'USER',
					userIncidentStatus : status || activeStatus,
					isStatsRequired    : true,
					performedBy        : queryData.performedBy || userId,
					newIncidentId      : queryData.newIncidentId || undefined,
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
				Toast.error('Failed to get incident');
			}
		}
	};

	useEffect(() => {
		reftech();
	}, [JSON.stringify(rest), activeTab, query, requestType, Date, status]);

	return {
		data,
		loading,
		globalFilters,
		setGlobalFilters,
		reftech,
	};
};
export default useGetIncidentMangement;
