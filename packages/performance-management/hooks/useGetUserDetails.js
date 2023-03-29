import { Toast } from '@cogoport/components';
import { useIrisRequest } from '@cogoport/request';
import { useEffect } from 'react';

import getDefaultFeedbackMonth from '../utils/getDefaultYearMonth';

const useGetUserDetails = ({ userId = '' }) => {
	const [{ loading = false, data : userData = {} }, trigger] = useIrisRequest({
		url    : 'get_iris_get_user_info',
		method : 'get',
	}, { manual: true });

	const { feedbackMonth, feedbackYear } = getDefaultFeedbackMonth();

	const getUserDetails = () => {
		try {
			trigger({ params: { UserID: userId || undefined, Year: feedbackYear, Month: feedbackMonth } });
		} catch (e) {
			Toast.error(e.response?.data.error?.toString());
		}
	};

	useEffect(() => {
		getUserDetails();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return {
		loading,
		userData,
	};
};

export default useGetUserDetails;
