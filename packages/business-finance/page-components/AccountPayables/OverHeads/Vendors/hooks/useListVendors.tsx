import { useRequest } from '@cogoport/request';
import { useEffect } from 'react';

const useListVendors = () => {
	const [
		{ data, loading },
		trigger,
	] = useRequest(
		{
			url    : '/list_vendors',
			method : 'get',
			// authKey : 'get_list_vendors',
		},
		{ manual: true },
	);

	useEffect(() => {
		trigger();
	}, []);

	return {
		listData: data,
		loading,
	};
};

export default useListVendors;
