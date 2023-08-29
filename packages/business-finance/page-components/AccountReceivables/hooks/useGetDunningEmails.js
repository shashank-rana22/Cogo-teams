import { useRequest } from '@cogoport/request';
import { useState, useCallback, useEffect } from 'react';

const useGetEmails = ({ orgData = {}, isActive }) => {
	const [filters, setFilters] = useState({ page_limit: 10 });
	const { registrationNumber } = orgData || {};
	const { page, page_limit } = filters || {};
	const email_type = isActive ? 'received' : 'sent';
	const [
		{ data, loading },
		trigger,
	] = useRequest(
		{
			url    : '/list_dunning_emails',
			method : 'get',
		},
		{ manual: true },
	);

	const refetch = useCallback(async () => {
		trigger({
			params: {
				page,
				page_limit,
				registration_number      : registrationNumber,
				email_type,
				pagination_data_required : true,
				filters                  : { category: 'cycle' },
			},
		});
	}, [page, page_limit, registrationNumber, email_type, trigger]);

	useEffect(() => {
		refetch();
	}, [refetch]);

	return {
		loading,
		data,
		refetch,
		setFilters,
		filters,
	};
};

export default useGetEmails;
