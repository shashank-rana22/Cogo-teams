import { useRequestBf } from '@cogoport/request';
import { useEffect } from 'react';

const useListVendors = (filters) => {
	const { page, pageLimit } = filters;
	const [
		{ data, loading },
		trigger,
	] = useRequestBf(
		{
			url     : '/purchase/expense/list-vendors',
			method  : 'get',
			authKey : 'list_vendors',
		},
		{ manual: true },
	);

	useEffect(() => {
		trigger({
			params: {
				page_limit                 : pageLimit,
				page,
				verification_data_required : true,
			},
		});
	}, [page, trigger, pageLimit]);

	return {
		listData: data,
		loading,
	};
};

export default useListVendors;
