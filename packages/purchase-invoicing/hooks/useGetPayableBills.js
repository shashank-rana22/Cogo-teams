import { useRequestBf } from '@cogoport/request';

const useGetPayableBills = ({ shipment_data = {} }) => {
	const [{ data, loading }, trigger] = useRequestBf({
		url     : '/purchase/payable-bill/list',
		method  : 'get',
		authKey : 'get_purchase_payable_bill_list',
		params  : {
			crossSelled : true,
			q           : shipment_data?.serial_id,
			pageIndex   : 1,
			pageSize    : 10,
		},
	}, { manual: false, autoCancel: false });

	return {
		loading,
		invoiceData : data,
		invoiceList : data?.list || [],
		trigger,
	};
};

export default useGetPayableBills;
