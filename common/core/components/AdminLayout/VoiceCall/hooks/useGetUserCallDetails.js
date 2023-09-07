import getGeoConstants from '@cogoport/globalization/constants/geo';
import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { useEffect, useCallback } from 'react';

const getPayload = ({
	mobileNumber = '',
	mobileCountryCode = '',
	userId = '',
	countryCode = '',
}) => ({
	mobile_number       : mobileNumber,
	mobile_country_code : mobileCountryCode || countryCode,
	performed_by_id     : userId,
});

const useGetUserCallDetails = ({
	mobileNumber = '',
	mobileCountryCode = '',
}) => {
	const geo = getGeoConstants();

	const countryCode = geo.country.mobile_country_code;

	const { userId } = useSelector(({ profile }) => ({ userId: profile?.user?.id }));

	const [{ data, loading }, trigger] = useRequest({
		url    : '/get_agent_wise_user_details',
		method : 'get',
	}, { manual: true });

	const getVoiceCall = useCallback(async () => {
		try {
			await trigger({
				params: getPayload({ mobileNumber, mobileCountryCode, userId, countryCode }),
			});
		} catch (error) {
			console.error(error);
		}
	}, [countryCode, mobileCountryCode, mobileNumber, trigger, userId]);

	useEffect(() => {
		getVoiceCall();
	}, [getVoiceCall]);

	return {
		loading,
		data,
	};
};
export default useGetUserCallDetails;
