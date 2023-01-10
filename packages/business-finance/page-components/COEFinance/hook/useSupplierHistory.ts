import { useRequestBf} from '@cogoport/request';
import { useEffect } from 'react';
import {useRouter} from '@cogoport/next';
import { Toast } from '@cogoport/components';
const useShipmentDocument = () => {
	const { query} = useRouter();
    const {billId}=query;
	
	const [{ data:historyData, loading }, trigger] = useRequestBf(
		{
			url     : '/purchase/bills/supplier-history',
			method  : 'get',
		},
		{ autoCancel: false },
	);
	const getSupplierHistory = async () => {
		try {
			await trigger({
				params:{
					id:billId,
				}
			});
		} catch (err) {
			Toast.error('INVOICE DETAILS DOES NOT EXIST');
		}
	};

	
	return {
		historyData,
		getSupplierHistory,
		loading
	};
};

export default useShipmentDocument;