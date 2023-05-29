import { useRequest } from '@cogoport/request';
import { useState } from 'react';

function useGetTableView() {
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
