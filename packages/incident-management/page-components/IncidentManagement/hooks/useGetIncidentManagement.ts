/* eslint-disable react-hooks/exhaustive-deps */
import { Toast } from '@cogoport/components';
import useDebounceQuery from '@cogoport/forms/hooks/useDebounceQuery';
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
		pageIndex: 1,

	});
	const { search, type, request_type, Date, status, ...rest } = globalFilters;

	const { startDate, endDate } = Date || {};
	const { query = '', debounceQuery } = useDebounceQuery();

	useEffect(() => {
		debounceQuery(search);
	}, [search]);

	let activeStatus = [];

	if (activeTab === 'requested') {
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
					performedBy        : userId,
					pageIndex          : globalFilters.pageIndex,
					q                  : query !== '' ? query : undefined,
					type               : request_type,
					createdFrom        : startDate ? format(startDate as Date, 'yyyy-MM-dd 00:00:00', {}, false)
						: undefined,
					createdTo: endDate
						? format(endDate as Date, 'yyyy-MM-dd 00:00:00', {}, false) : undefined,
					// userIncidentStatus: status || undefined,

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
	}, [JSON.stringify(rest), activeTab, query, request_type, Date, status]);

	return {
		data,
		loading,
		globalFilters,
		setGlobalFilters,
	};
};
export default useGetIncidentMangement;
