import { Toast } from '@cogoport/components';
import { useRequestBf } from '@cogoport/request';
import { useCallback } from 'react';

const useGetPayrun = ({ activePayrunTab, overseasData, query, pageIndex }) => {
	const [{ data, loading }, trigger] = useRequestBf(
		{
			url     : '/purchase/payrun',
			method  : 'get',
			authKey : 'get_purchase_payrun',
		},
		{ manual: true, autoCancel: false },
	);

	const getPayrunList = useCallback(() => {
		(async () => {
			try {
				await trigger({
					params: {
						pageSize : 10,
						state    : activePayrunTab,
						type     : overseasData,
						q        : query !== '' ? query : undefined,
						pageIndex,
					},
				});
			} catch (err) {
				Toast.error(err.message);
			}
		})();
	}, [activePayrunTab, overseasData, pageIndex, query, trigger]);

	const { stats } = data || {};

	return {
		payrunData    : data,
		payrunLoading : loading,
		payrunStats   : stats,
		getPayrunList,
	};
};

export default useGetPayrun;
