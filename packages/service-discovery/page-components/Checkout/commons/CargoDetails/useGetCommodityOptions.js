import { useRequestBf } from '@cogoport/request';
import { isEmpty } from '@cogoport/utils';

import { getServiceMode } from './getServiceMode';

const useGetCommodityOptions = ({ detail = {} }) => {
	const mode = getServiceMode(detail?.primary_service);

	const [{ data, loading }] = useRequestBf({
		method  : 'get',
		url     : '/saas/hs-code/list-commodities',
		params  : { service: mode },
		authkey : 'get_saas_hs_code_list_commodities',
	}, { manual: detail?.primary_service !== 'fcl_freight' });

	let commodityTypeOptions = [];

	if (!isEmpty(data)) {
		const formatOptions = (data || []).map((item) => ({
			label : item?.commodityDisplayName,
			value : item?.commodity,
		}));
		commodityTypeOptions = formatOptions;
	}

	return {
		loading,
		data,
		commodityTypeOptions,
	};
};

export default useGetCommodityOptions;
