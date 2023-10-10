import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { useRouter } from '@cogoport/next';
import { useRequestBf } from '@cogoport/request';
import { isEmpty } from '@cogoport/utils';
import { useState, useEffect } from 'react';

const useGetRates = () => {
	const { query } = useRouter();
	const { policySearchId } = query || {};

	const [selectedRateCard, setSelectedRateCard] = useState({});

	const [{ loading, data }] = useRequestBf({
		method  : 'get',
		url     : '/saas/insurance/v2/search-rate',
		authKey : 'get_saas_insurance_v2_search_rate',
		params  : {
			policySearchId,
		},
	}, { manual: !policySearchId });

	useEffect(() => {
		if (!isEmpty(data?.rateResponse)) {
			setSelectedRateCard(data?.rateResponse[GLOBAL_CONSTANTS.zeroth_index]);
		}
	}, [data]);

	return { loading, data, selectedRateCard, setSelectedRateCard };
};

export default useGetRates;
