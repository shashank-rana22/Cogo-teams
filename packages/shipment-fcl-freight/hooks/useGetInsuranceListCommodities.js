import toastApiError from '@cogoport/ocean-modules/utils/toastApiError';
import { useRequestBf } from '@cogoport/request';
import { useEffect, useCallback } from 'react';

const useGetInsuranceListCommodities = () => {
	const [{ loading, data }, trigger] = useRequestBf({
		authKey : 'get_saas_insurance_list_commodities',
		url     : 'saas/insurance/list-commodities',
		method  : 'GET',
	}, { manual: true });

	const getListCommodities = useCallback(async () => {
		try {
			await trigger();
		} catch (err) {
			toastApiError(err);
		}
	}, [trigger]);

	useEffect(() => {
		getListCommodities();
	}, [getListCommodities]);

	const list = data?.list?.map((item) => ({
		...item,
		commodity: `${item?.commodity}(${item?.subCommodity})`,
	})) || [];

	return { list, loadingCommodity: loading };
};
export default useGetInsuranceListCommodities;
