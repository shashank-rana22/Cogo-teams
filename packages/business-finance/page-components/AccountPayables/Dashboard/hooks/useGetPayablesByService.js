import { Toast } from '@cogoport/components';
import { useRequestBf } from '@cogoport/request';
import { useCallback, useEffect } from 'react';

const useGetPayablesByService = ({ activeEntity }) => {
	const [
		{ data, loading },
		trigger,
	] = useRequestBf(
		{
			url     : '/purchase/payable/dashboard/paybles-by-service',
			method  : 'get',
			authKey : 'get_purchase_payable_dashboard_paybles_by_service',
		},
		{ manual: true, autoCancel: false },
	);

	const getDahboardData = useCallback(() => {
		(async () => {
			try {
				await trigger({
					params: {
						entity: activeEntity,
					},
				});
			} catch (e) {
				Toast.error(e?.message);
			}
		})();
	}, [trigger, activeEntity]);

	useEffect(() => {
		getDahboardData();
	}, [getDahboardData]);

	return {
		data,
		loading,
		getDahboardData,
	};
};

export default useGetPayablesByService;
