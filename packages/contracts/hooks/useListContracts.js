import { useRequest } from '@cogoport/request';
import { useState, useEffect } from 'react';

const useListContracts = () => {
	const [filters, setFilters] = useState({
		page   : 1,
		status : 'pending_approval',
	});

	const [data, setData] = useState();

	const { page, status } = filters;

	const [{ error, loading }, trigger] = useRequest({
		url    : '/list_contracts',
		method : 'GET',
	}, { manual: true });
	const listContracts = async () => {
		try {
			const res = await trigger({
				params: {
					filters                : {},
					services_data_required : true,
					status,
					page,
				},
			});
			setData(res?.data);
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		listContracts();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [filters]);

	return {
		data,
		loading,
		filters,
		error,
		setFilters,
		listContracts,
	};
};

export default useListContracts;
