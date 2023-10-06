import { useRequestBf } from '@cogoport/request';
import { useEffect } from 'react';

const useGetListStats = () => {
	const [{ data, loading }, trigger] = useRequestBf(
		{
			url     : '/purchase/bills/list-stats',
			method  : 'get',
			authKey : 'get_purchase_bills_list_stats',
		},
	);

	useEffect(() => {
		const getData = async () => {
			try {
				await trigger({
					params: {},
				});
			} catch (error) {
				console.log(error);
			}
		};
		getData();
	}, [trigger]);

	return {
		data,
		loading,
	};
};

export default useGetListStats;
