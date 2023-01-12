import { useRequestBf} from '@cogoport/request';
import { Toast } from '@cogoport/components';
const useSupplierHistory = ({data}) => {
	
	const {serviceProviderDetail} = data
	
	
	const [{ data:historyData, loading }, trigger] = useRequestBf(
		{
			url     : '/common/job/supplier-history',
			method  : 'get',
		},
		{ autoCancel: false },
	);
	const getSupplierHistory = async () => {
		try {
			await trigger({
				params:{
					id:serviceProviderDetail?.organizationId,
				}
			});
		} catch (err) {
			Toast.error('SUPPLIER HISTORY DOES NOT EXIST');
		}
	};

	
	return {
		historyData,
		getSupplierHistory,
		loading
	};
};

export default useSupplierHistory;