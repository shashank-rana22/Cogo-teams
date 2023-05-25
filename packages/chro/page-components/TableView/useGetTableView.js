import { useForm } from '@cogoport/forms';
import { useRequest } from '@cogoport/request';
import { useState } from 'react';


function useGetTableView() {


	const [params, setParams] = useState({
		
	});

	const [{ data, loading }, refetch] = useRequest({
		method : 'get',
		url    : '/list_employee_offer_letters',
		params,
	}, { manual: false });


	const formProps = useForm();

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
		formProps,
		params,
		setParams,
		refetch,
	};
}

export default useGetTableView;
