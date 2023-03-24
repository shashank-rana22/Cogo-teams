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
			const res = await trigger({ params });
			if (!res.hasError) {
				setShowNotificationContent(false);
				Toast.success('Notifications cleared successfully!');
			}
		} catch (e) {
			Toast.error(e?.messages);
		}
	};

	return { onClickClearNotifications, loading };
};

export default useClearFaqNotifications;
