import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { useEffect, useCallback } from 'react';

const getPayload = ({
	mobileNumber = '',
	mobileCountryCode = '',
	userId = '',
}) => ({
	user_number         : mobileNumber,
	mobile_country_code : mobileCountryCode,
	performed_by_id     : userId,
});

const useGetUserCallDetails = ({
	mobileNumber = '',
	mobileCountryCode = '',
}) => {
	const { userId } = useSelector(({ profile }) => ({ userId: profile?.user?.id }));

	const [{ data, loading }, trigger] = useRequest({
		url    : '/list_info_during_calls',
		method : 'get',
	}, { manual: true });

	const getVoiceCall = useCallback(async () => {
		try {
			await trigger({
				params: getPayload({ mobileNumber, mobileCountryCode, userId }),
			});
		} catch (error) {
			console.error(error);
		}
	}, [mobileCountryCode, mobileNumber, trigger, userId]);

	useEffect(() => {
		getVoiceCall();
	}, [getVoiceCall]);

	return {
		loading,
		data,
	};
};
export default useGetUserCallDetails;
