import { useRequest } from '@cogoport/request';
import { useState, useEffect } from 'react';

const useListContracts = () => {
	const [filters, setFilters] = useState({
		page   : 1,
		status : 'pending_approval',
	});

	const [data, setData] = useState();

	const { page, status, q } = filters;

	const [{ error, loading }, trigger] = useRequest({
		url    : '/list_contracts',
		method : 'GET',
	}, { manual: true });
	const listContracts = async () => {
		try {
			const res = await trigger({
				params: {
					filters: {
						service_types : ['fcl_freight', 'lcl_freight', 'air_freight'],
						status,
						sort_by       : status === 'active' ? 'updated_at' : undefined,
						q             : q || undefined,
					},
					services_data_required             : true,
					contract_utilisation_data_required : true,
					page,
				},
			});
			setData(res?.data);
		} catch (err) {
			// console.log(err);
		}
	};

	useEffect(() => {
		listContracts();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [JSON.stringify(filters)]);

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
