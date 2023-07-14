import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequestBf } from '@cogoport/request';
import { useEffect, useCallback } from 'react';

const useGetInsuranceCountrySupported = (country_id = '') => {
	const [{ loading, data }, trigger] = useRequestBf({
		auth   : 'get_saas_insurance_country_supported',
		url    : 'saas/insurance/country-supported',
		method : 'GET',
		params : {
			policyCountryId: country_id,
		},
	}, { manual: true });

	const getCountrySupportedList = useCallback(async () => {
		try {
			await trigger({});
		} catch (err) {
			if (err?.response?.data) {
				Toast.error(getApiErrorString(err.response?.data));
			}
		}
	}, [trigger]);

	useEffect(() => {
		getCountrySupportedList();
	}, [getCountrySupportedList]);

	return {
		isEligible: data,
		loading,
	};
};
export default useGetInsuranceCountrySupported;
