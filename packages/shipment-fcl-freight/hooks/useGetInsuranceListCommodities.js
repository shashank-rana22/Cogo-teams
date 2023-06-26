import { useRequestBf } from '@cogoport/request';

const useGetInsuranceListCommodities = () => {
	const [{ data }] = useRequestBf({
		auth   : 'get_saas_insurance_list_commodities',
		url    : 'saas/insurance/list-commodities',
		method : 'GET',
	}, { manual: true });

	return { list: data?.list || [] };
};
export default useGetInsuranceListCommodities;
