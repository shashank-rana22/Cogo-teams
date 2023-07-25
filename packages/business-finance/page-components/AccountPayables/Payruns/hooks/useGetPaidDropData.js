import { Toast } from '@cogoport/components';
import { useRequestBf } from '@cogoport/request';

const useGetPaidDropData = ({ itemData = {}, overseasData = '' }) => {
	const { objectId = '' } = itemData;

	const [{ data: domesticData, loading: domesticLoading }, trigger] = useRequestBf({
		url     : `/purchase/payrun-bill/list-paid-bill/${objectId}`,
		method  : 'get',
		authKey : 'get_purchase_payrun_bill_list_paid_bill_by_id',
	}, { manual: true, autoCancel: false });

	const [{ data : advanceData, advanceLoading }, advanceTrigger] = useRequestBf({
		url     : `/purchase/payrun-bill/list-paid-advance-doc/${objectId}`,
		method  : 'get',
		authKey : 'get_purchase_payrun_bill_list_paid_advance_doc_by_id',
	}, { manual: true, autoCancel: false });

	const getApi = overseasData === 'ADVANCE_PAYMENT' ? advanceTrigger : trigger;

	const getData = async () => {
		try {
			await getApi({ params: {} });
		} catch (error) {
			Toast.error(error.message, 'Somthing went Wrong');
		}
	};
	return {
		getData,
		data    : overseasData === 'ADVANCE_PAYMENT' ? advanceData : domesticData,
		loading : overseasData === 'ADVANCE_PAYMENT' ? advanceLoading : domesticLoading,
	};
};

export default useGetPaidDropData;
