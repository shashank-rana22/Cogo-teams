/* eslint-disable react-hooks/exhaustive-deps */
import { useRequest } from '@cogoport/request';
import { isEmpty } from '@cogoport/utils';
import { useCallback, useEffect } from 'react';

import getSimulationLevelRevenue from '../utils/getSimulationLevelRevenue';

const useGetSimulation = ({ activeTab = '', singleData = {}, setSingleData = () => {} }) => {
	const emptyCheck = !isEmpty(singleData);

	const { item = {} } = singleData;
	const { serieId = '' } = item;

	const selectedRevenue = getSimulationLevelRevenue(item?.data?.x);

	const [{ data, loading }, trigger] = useRequest({
		url    : '/get_referral_simulation',
		method : 'get',
	}, { manual: true });

	useEffect(() => {
		setSingleData({});
	}, [activeTab]);

	const getSimulation = useCallback(async () => {
		try {
			await trigger({
				params: {
					event                : activeTab,
					revenue_currency     : 'INR',
					max_levels           : 30,
					detail_data_required : emptyCheck ? true : undefined,
					selected_revenue     : selectedRevenue || undefined,
					selected_level       : emptyCheck ? serieId : undefined,
				},
			});
		} catch (error) {
			console.log(error);
		}
	}, [activeTab, emptyCheck, selectedRevenue, serieId, trigger]);

	useEffect(() => {
		getSimulation();
	}, [getSimulation]);

	return {
		data,
		loading,
	};
};

export default useGetSimulation;
