/* eslint-disable react-hooks/exhaustive-deps */
import { useRequestBf } from '@cogoport/request';
import { useEffect } from 'react';

const useGetTaggingBills = ({ billId }: { billId:string }) => {
	const [{ data, loading }, trigger] = useRequestBf(
		{
			url     : '/purchase/bills/tagging-map',
			method  : 'get',
			authKey : 'get_purchase_bills_daily_tagging_map',
		},
		{ autoCancel: false },
	);

	const getMappings = async () => {
		try {
			await trigger({
				params: {
					billId,
				},
			});
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		getMappings();
	}, []);

	return {
		getMappings,
		loading,
		mappingsData: data,
	};
};

export default useGetTaggingBills;
