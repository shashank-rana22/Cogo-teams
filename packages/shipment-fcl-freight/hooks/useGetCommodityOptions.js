import { useRequestBf } from '@cogoport/request';
import { useEffect } from 'react';

const MODE = 'OCEAN';

function useGetCommodityOptions({ task }) {
	const [{ loading, data }, trigger] = useRequestBf({
		url     : '/saas/hs-code/list-commodities',
		method  : 'get',
		authKey : 'get_saas_hs_code_list_commodities',
	}, { manual: true, autoCancel: false });

	useEffect(() => {
		if (task?.task === 'mark_confirmed' && task?.state === 'shipment_received') {
			trigger({
				params: {
					service: MODE,
				},
			});
		}
	}, [trigger, task]);

	const options = (data || []).map((item) => ({
		label : item?.commodityDisplayName,
		value : item?.commodity,
	}));

	return {
		loading,
		allCommodity: data,
		options,
	};
}

export default useGetCommodityOptions;
