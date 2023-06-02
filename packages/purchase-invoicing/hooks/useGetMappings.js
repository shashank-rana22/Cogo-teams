import { useRequestBf } from '@cogoport/request';

const useGetTaggingBills = ({ shipmentId, serviceProviderId }) => {
	const [{ data, loading }] = useRequestBf(
		{
			url     : '/purchase/bills/tagging-map',
			method  : 'get',
			authKey : 'get_purchase_bills_tagging_map',
			params  : {
				shipmentId,
				serviceProviderId,
			},
		},
	);

	return {
		loading,
		mappingsData: data,
	};
};

export default useGetTaggingBills;
