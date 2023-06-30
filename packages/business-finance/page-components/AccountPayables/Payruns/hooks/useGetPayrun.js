import { Toast } from '@cogoport/components';
import { useRequestBf } from '@cogoport/request';
import { useEffect, useCallback } from 'react';

// import { initiatedConfig } from '../columns/initiatedConfig';

const useGetPayrun = ({ activePayrunTab }) => {
	const [{ data, loading }, trigger] = useRequestBf(
		{
			url     : '/purchase/payrun',
			method  : 'get',
			authKey : 'get_purchase_payrun',
		},
		{ manual: true, autoCancel: false },
	);
	// const config = initiatedConfig;
	// let config = {};
	// if (activePayrunTab === 'INITIATED') {
	// 	config = initiatedConfig;
	// }

	const getPayrunList = useCallback(() => {
		(async () => {
			try {
				await trigger({
					params: {
						pageIndex : 1,
						pageSize  : 10,
						state     : activePayrunTab,
					},
				});
			} catch (err) {
				Toast.error(err.message);
			}
		})();
	}, [activePayrunTab, trigger]);

	useEffect(() => {
		getPayrunList();
	}, [activePayrunTab, getPayrunList]);

	const { stats } = data || {};

	return {
		payrunData    : data,
		payrunLoading : loading,
		// config,
		payrunStats   : stats,
		getPayrunList,
	};
};

export default useGetPayrun;
