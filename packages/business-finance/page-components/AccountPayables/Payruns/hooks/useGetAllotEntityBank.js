import { Toast } from '@cogoport/components';
import { useRequestBf } from '@cogoport/request';
import { useCallback } from 'react';

const useGetAllotEntityBank = ({ selectedPayrun, checkedRow }) => {
	const { entityCode = undefined, currency = undefined } = checkedRow || selectedPayrun || {};

	const [{ data: allotEntityBank, loading: allotEntityLoading }, trigger] = useRequestBf({
		url     : '/purchase/treasury/live-status',
		method  : 'get',
		authKey : 'get_purchase_treasury_live_status',
	}, { manual: true, autoCancel: false });

	const getEntityBank = useCallback(() => {
		try {
			trigger({
				params: {
					entityCode,
					currency,
				},
			});
		} catch (e) {
			Toast.error(e?.data?.message);
		}
	}, [currency, entityCode, trigger]);

	return {
		allotEntityBank,
		allotEntityLoading,
		getEntityBank,
	};
};

export default useGetAllotEntityBank;
