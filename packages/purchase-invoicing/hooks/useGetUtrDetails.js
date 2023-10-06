import { useRequestBf } from '@cogoport/request';

const useGetUtrDetails = ({ billIds }) => {
	const [{ data, loading }] = useRequestBf(
		{
			url     : '/purchase/bills/utr-details',
			method  : 'post',
			authKey : 'post_purchase_bills_utr_details',
			data    : { billIds },
		},
	);

	return {
		loading,
		utrData: data,
	};
};

export default useGetUtrDetails;
