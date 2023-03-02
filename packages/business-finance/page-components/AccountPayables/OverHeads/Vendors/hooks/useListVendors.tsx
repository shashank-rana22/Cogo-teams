import { useRequest } from '@cogoport/request';
import { useEffect } from 'react';

const useListVendors = (filters) => {
	const { page, pageLimit } = filters;
	const [
		{ data, loading },
		trigger,
	] = useRequest(
		{
			url    : '/list_vendors',
			method : 'get',
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
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [page]);

	return {
		listData: data,
		loading,
	};
};

export default useListVendors;
