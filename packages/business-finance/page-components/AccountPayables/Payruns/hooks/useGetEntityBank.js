import { Toast } from '@cogoport/components';
import { useRequestBf } from '@cogoport/request';
import { useEffect } from 'react';

const useGetEntityBanks = ({ selectedPayrun }) => {
	const [{ data:bankData, loading:bankLoading }, bankTrigger] = useRequestBf({
		url     : '/purchase/payable/bank/list',
		method  : 'get',
		authKey : 'get_purchase_payable_bank_list',
	}, { manual: true, autoCancel: false });

	const { entityCode = undefined } = selectedPayrun || {};

	useEffect(() => {
		try {
			bankTrigger({
				params: {
					entityCode,
				},
			});
		} catch (err) {
			Toast.error('Something went wrong');
		}
	}, [bankTrigger, entityCode]);

	return {
		entityBank        : bankData,
		entityBankLoading : bankLoading,
	};
};

export default useGetEntityBanks;
