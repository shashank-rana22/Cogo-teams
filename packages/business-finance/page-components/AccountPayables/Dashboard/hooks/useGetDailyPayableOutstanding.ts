import { Toast } from '@cogoport/components';
import { useRequestBf } from '@cogoport/request';
import { useEffect } from 'react';

const useGetDailyPayableOutstanding = ({ isQuarterView, filters }) => {
	const [
		{ data, loading },
		trigger,
	] = useRequestBf(
		{
			url     : '/purchase/payable/dashboard/daily-payable-outstanding',
			method  : 'get',
			authKey : 'get_purchase_payable/dashboard/daily-payable-outstanding',
		},
		{ manual: true, autoCancel: false },
	);
	const {
		service,
		currency,
		...rest
	} = filters || {};
	const getDahboardData = async () => {
		try {
			await trigger({
				params: {
					view     : isQuarterView ? 'quarter' : 'month',
					service  : service || undefined,
					currency : currency || undefined,
				},
			});
		} catch (err) {
			Toast.error(err?.message);
		}
	};

	useEffect(() => {
		getDahboardData();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [JSON.stringify(rest), service, currency, isQuarterView]);

	return {
		data,
		loading,
		getDahboardData,
	};
};

export default useGetDailyPayableOutstanding;
