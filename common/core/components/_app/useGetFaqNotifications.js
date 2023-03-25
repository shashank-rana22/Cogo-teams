import { useRequest } from '@cogoport/request';
import { useCallback } from 'react';

const useGetFaqNotifications = () => {
	const [{ data, loading: faqNotificationApiLoading }, trigger] = useRequest({
		method : 'get',
		url    : 'get_faq_notification',
	}, { manual: false });

	const fetchFaqNotification = useCallback(async () => {
		try {
			await trigger();
		} catch (e) {
			console.log(e);
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
