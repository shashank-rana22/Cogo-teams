import getGeoConstants from '@cogoport/globalization/constants/geo';
import { useRequest } from '@cogoport/request';
import { useEffect, useCallback } from 'react';

const getPayload = ({
	mobileNumber = '',
	mobileCountryCode = '',
	countryCode = '',
}) => ({
	mobile_number       : mobileNumber,
	mobile_country_code : mobileCountryCode || countryCode,
});

const useGetUserCallDetails = ({
	mobileNumber = '',
	mobileCountryCode = '',
}) => {
	const geo = getGeoConstants();

	const countryCode = geo.country.mobile_country_code;

	const [{ data, loading }, trigger] = useRequest({
		url    : '/get_agent_wise_user_activity_logs',
		method : 'get',
	}, { manual: true });

	const getVoiceCall = useCallback(async () => {
		try {
			await trigger({
				params: getPayload({ mobileNumber, mobileCountryCode, countryCode }),
			});
		} catch (error) {
			console.error(error);
		}
	}, [countryCode, mobileCountryCode, mobileNumber, trigger]);

	useEffect(() => {
		getVoiceCall();
	}, [getVoiceCall]);

	return {
		loading,
		data,
	};
};
export default useGetUserCallDetails;
