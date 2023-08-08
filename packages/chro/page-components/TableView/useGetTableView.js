import { useRequest } from '@cogoport/request';
import { useState, useEffect } from 'react';

function useGetTableView({ search, activeTab }) {
	const [params, setParams] = useState({
		employee_details_required: true,
	});

	const [{ data, loading }, refetch] = useRequest({
		method : 'get',
		url    : '/list_employee_offer_letters',
		params,
	}, { manual: false });

	const onPageChange = (pageNumber) => {
		setParams((previousParams) => ({
			...previousParams,
			page: pageNumber,
		}));
	};

	useEffect(() => {
		setParams((previousParams) => ({
			...previousParams,
			filters: {
				q                          : search,
				status                     : activeTab,
				is_offer_letter_applicable : true,
			},
		}));
	}, [activeTab, search]);

	return {
		onPageChange,
		loading,
		data,
		params,
		setParams,
		refetch,
	};
}

export default useGetTableView;
