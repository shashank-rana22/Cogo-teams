import getGeoConstants from '@cogoport/globalization/constants/geo';
import { useRequest } from '@cogoport/request';
import { isEmpty } from '@cogoport/utils';
import { useCallback, useEffect } from 'react';

import { MAX_LEVEL, REVENUE_START_PRICE, REVENUE_END_PRICE } from '../constants';
import getSimulationLevelRevenue from '../utils/getSimulationLevelRevenue';

const EMPTY_FUNCTION = () => {};
const EMPTY_OBJECT = {};

const useGetSimulation = ({ type = '', activeTab = '', singleData = EMPTY_OBJECT, setSingleData = EMPTY_FUNCTION }) => {
	const geo = getGeoConstants();
	const currencyCode = geo.country.currency.code;
	const emptyCheck = !isEmpty(singleData);

	const { cell: item = {} } = singleData;
	const { serieId = '' } = item;

	const selectedRevenue = getSimulationLevelRevenue(item?.data?.x);

	const [{ data, loading }, trigger] = useRequest({
		url    : '/get_referral_simulation',
		method : 'get',
	}, { manual: true });

	useEffect(() => {
		setSingleData({});
	}, [activeTab, setSingleData]);

	const getSimulation = useCallback(async () => {
		const simulationPayload = {
			event               : activeTab,
			revenue_currency    : currencyCode,
			max_levels          : MAX_LEVEL,
			revenue_start_price : REVENUE_START_PRICE,
			revenue_end_price   : REVENUE_END_PRICE,
		};

		const levelPayload = {
			...simulationPayload,
			detail_data_required : emptyCheck ? true : undefined,
			selected_revenue     : selectedRevenue || undefined,
			selected_level       : emptyCheck ? serieId : undefined,
		};

		const newParams = type === 'level_data' && !isEmpty(singleData) ? levelPayload : simulationPayload;
		try {
			await trigger({
				params: newParams,

			});
		} catch (error) {
			console.log(error);
		}
	}, [activeTab, currencyCode, emptyCheck, selectedRevenue, serieId, singleData, trigger, type]);

	useEffect(() => {
		getSimulation();
	}, [getSimulation]);

	return {
		data,
		loading,
	};
};

export default useGetSimulation;
