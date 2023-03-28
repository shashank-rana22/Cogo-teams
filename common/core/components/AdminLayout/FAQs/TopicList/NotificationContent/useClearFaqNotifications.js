import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';

const useClearFaqNotifications = ({
	setShowNotificationContent,
	faqNotificationData = {},
}) => {
	const [{ loading = false }, trigger] = useRequest({
		url    : 'clear_faq_notifications',
		method : 'POST',
	}, { manual: true });

	const questionIds = (faqNotificationData || []).map(
		(questionnData) => questionnData?.id,
	);

	const params = {
		faq_question_ids: questionIds,

	};

	const onClickClearNotifications = async () => {
		try {
			await trigger({ params });
			setShowNotificationContent(false);
			Toast.success('Notifications cleared successfully!');
		} catch (err) {
			Toast.error(err?.message);
		}
	};

	return { onClickClearNotifications, loading };
};

export default useClearFaqNotifications;
