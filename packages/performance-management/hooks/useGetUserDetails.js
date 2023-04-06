import { useIrisRequest } from '@cogoport/request';

import getDefaultFeedbackMonth from '../utils/getDefaultYearMonth';

const useGetUserDetails = ({ userId = '' }) => {
	const { feedbackMonth, feedbackYear } = getDefaultFeedbackMonth();

	const [{ loading = false, data : userData = {} }] = useIrisRequest({
		url    : 'get_iris_get_user_info',
		method : 'get',
		params : { UserID: userId || undefined, Year: feedbackYear, Month: feedbackMonth },
	}, { manual: false });

	return {
		loading,
		userData,
	};
};

export default useGetUserDetails;
