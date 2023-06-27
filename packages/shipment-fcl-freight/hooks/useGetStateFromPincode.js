import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { getCountrySpecificData } from '@cogoport/globalization/utils/CountrySpecificDetail';
import { useRequest } from '@cogoport/request';
import { useEffect, useCallback } from 'react';

const PINCODE_LENGTH = 6;

function useGetStateFromPincode({ pincode = '', policyForSelf = true }) {
	const COUNTRY_IDS = [];
	const countryCode =	GLOBAL_CONSTANTS.service_supported_countries.feature_supported_service
		.cargo_insurance.countries || [];
	countryCode.forEach((item) => {
		COUNTRY_IDS.push(getCountrySpecificData(item));
	});

	const [{ loading, data }, trigger] = useRequest({
		url    : '/list_locations',
		method : 'GET',
		params : {
			filters: {
				postal_code : pincode,
				type        : 'pincode',
				COUNTRY_IDS,
			},
			includes: {
				country                 : '',
				region                  : '',
				city                    : '',
				default_params_required : true,
			},
		},
	}, { manual: true });

	const responseCity = useCallback(
		async () => {
			try {
				await trigger();
			} catch (error) {
				Toast.error(
					getApiErrorString(error?.error?.message),
				);
			}
		},
		[trigger],
	);

	useEffect(() => {
		if (pincode !== '' && pincode?.length === PINCODE_LENGTH && policyForSelf) {
			responseCity();
		}
	}, [pincode, policyForSelf, responseCity]);

	return {
		cityLoading : loading,
		cityState   : data?.list,
	};
}

export default useGetStateFromPincode;
