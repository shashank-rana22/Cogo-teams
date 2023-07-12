import { useRequestBf } from '@cogoport/request';
import { useCallback } from 'react';

const useGetInsuranceRate = (props) => {
	const { setRateData } = props || {};

	const [{ loading }, trigger] = useRequestBf({
		auth   : 'get_saas_insurance_rate',
		url    : 'saas/insurance/rate',
		method : 'GET',
	}, { manual: true });

	const getCargoInsruanceRate = useCallback(async (values) => {
		try {
			const res = await trigger({
				params: { ...values },
			});

			setRateData(res?.data);
		} catch (err) {
			setRateData({});
		}
	}, [setRateData, trigger]);

	return {
		loading,
		getCargoInsruanceRate,
	};
};
export default useGetInsuranceRate;
