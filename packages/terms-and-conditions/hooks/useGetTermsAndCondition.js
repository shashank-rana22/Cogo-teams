import { useRequest } from '@cogoport/request';
import { useEffect, useState, useCallback } from 'react';

const useGetTermsAndCondition = () => {
	const [editTncModalId, setEditTncModalId] = useState(null);
	const [tncLevel, setTncLevel] = useState('basicInfo');
	const [filters, setFilters] = useState({ status: 'active' });

	const [{ data, loading }, trigger] = useRequest({
		url    : '/list_terms_and_conditions',
		method : 'get',
	});

	const getListTermsAndConditionsApi = useCallback(() => {
		const params = {
			sort_by : 'updated_at',
			filters : {
				sort_by : 'updated_at',
				...filters,
				type    : 'logistics_services',
			},
		};

		trigger({ params });
	}, [filters, trigger]);

	useEffect(() => {
		getListTermsAndConditionsApi();
	}, [filters, getListTermsAndConditionsApi]);

	return {
		data,
		loading,
		editTncModalId,
		setEditTncModalId,
		tncLevel,
		setTncLevel,
		filters,
		setFilters,
		refetchListApi: getListTermsAndConditionsApi,
	};
};

export default useGetTermsAndCondition;
