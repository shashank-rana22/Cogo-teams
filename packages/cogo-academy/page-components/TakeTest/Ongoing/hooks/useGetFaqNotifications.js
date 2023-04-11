import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';
import { useCallback } from 'react';

const useGetFaqNotifications = () => {
	const [{ data, loading: faqNotificationApiLoading }, trigger] = useRequest({
		method : 'get',
		url    : '/get_faq_notification',
	}, { manual: false });

	const fetchFaqNotification = useCallback(async () => {
		try {
			await trigger();
		} catch (error) {
			Toast.error(getApiErrorString(error.response?.data));
		}
	}, [trigger]);

	const { notification_details: faqData = [] } = data || {};

	return {
		faqNotificationApiLoading,
		fetchFaqNotification,
		trigger,
		faqData,
	};
};
export default useGetFaqNotifications;
