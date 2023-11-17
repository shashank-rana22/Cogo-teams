import toastApiError from '@cogoport/air-modules/utils/toastApiError';
import { useRequestBf } from '@cogoport/request';
import { useEffect } from 'react';

const useGetInsuranceCountrySupported = ({
	destination_country_id = '',
	origin_country_id = '',
}) => {
	const [{ loading, data }, trigger] = useRequestBf({
		authKey : 'get_saas_insurance_v2_country_supported',
		url     : 'saas/insurance/v2/country-supported',
		method  : 'GET',
		params  : {
			originCountryId      : origin_country_id,
			destinationCountryId : destination_country_id,
		},
	}, { manual: true });

	const getCountrySupportedList = async () => {
		try {
			await trigger({});
		} catch (err) {
			toastApiError(err);
		}
	};

	useEffect(() => {
		if (destination_country_id && origin_country_id) {
			getCountrySupportedList();
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [destination_country_id, origin_country_id]);

	return {
		isEligible: data,
		loading,
	};
};
export default useGetInsuranceCountrySupported;
