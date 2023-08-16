import toastApiError from '@cogoport/ocean-modules/utils/toastApiError';
import { useRequestBf } from '@cogoport/request';
import { useEffect, useCallback } from 'react';

const useGetInsuranceListCommodities = () => {
	const [{ data }, trigger] = useRequestBf({
		auth   : 'get_saas_insurance_list_commodities',
		url    : 'saas/insurance/list-commodities',
		method : 'GET',
	}, { manual: true });

	const getListCommodities = useCallback(async () => {
		try {
			await trigger({});
		} catch (err) {
			toastApiError(err);
		}
	}, [trigger]);

	useEffect(() => {
		getListCommodities();
	}, [getListCommodities]);

	return { list: data?.list || [] };
};
export default useGetInsuranceListCommodities;
