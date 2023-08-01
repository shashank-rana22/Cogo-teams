import { Toast } from '@cogoport/components';
import { useRequestBf } from '@cogoport/request';
import { useEffect } from 'react';

const useGetEntityBanks = ({ selectedPayrun }) => {
	const [{ data, loading }, bankTrigger] = useRequestBf({
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
		entityBank        : data,
		entityBankLoading : loading,
	};
};

export default useGetEntityBanks;
