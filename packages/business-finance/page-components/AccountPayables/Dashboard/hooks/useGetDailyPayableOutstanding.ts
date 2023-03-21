import { useRequestBf } from '@cogoport/request';
import { useEffect } from 'react';

const useGetDailyPayableOutstanding = ({ isQuarterView }) => {
	const [
		{ data, loading },
		trigger,
	] = useRequestBf(
		{
			url     : '/purchase/payable/dashboard/daily-payable-outstanding',
			method  : 'get',
			authKey : 'get_purchase_payable/dashboard/daily-payable-outstanding',
		},
		{ manual: true },
	);

	const getDahboardData = async () => {
		try {
			await trigger({
				params: {
					view: isQuarterView ? 'quarter' : 'month',
				},
			});
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		getDahboardData();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isQuarterView]);

	return {
		data,
		loading,
		getDahboardData,
	};
};

export default useGetDailyPayableOutstanding;
