import { useRequestBf } from '@cogoport/request';

const useGetTaggingBills = ({ billId }) => {
	const [{ data, loading }] = useRequestBf(
		{
			url     : '/purchase/bills/tagging-map',
			method  : 'get',
			authKey : 'get_purchase_bills_tagging_map',
			params  : { billId },
		},
		{ manual: false },
	);

	return {
		loading,
		mappingsData: data,
	};
};

export default useGetTaggingBills;
