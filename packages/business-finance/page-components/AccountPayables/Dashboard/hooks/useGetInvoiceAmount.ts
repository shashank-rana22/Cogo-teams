import { Toast } from '@cogoport/components';
import { useRequestBf } from '@cogoport/request';
import { useCallback, useEffect } from 'react';

interface ItemProps {
	activeEntity: string,
}

const useGetInvoiceAmount = ({ activeEntity }:ItemProps) => {
	const [
		{ data, loading },
		trigger,
	] = useRequestBf(
		{
			url     : '/payments/outstanding/paybles-info',
			method  : 'get',
			authKey : 'get_payments_outstanding_paybles_info',
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

export default useGetInvoiceAmount;
