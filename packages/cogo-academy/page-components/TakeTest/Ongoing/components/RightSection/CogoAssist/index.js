import TopicList from '@cogoport/core/components/AdminLayout/FAQs/TopicList';

import useGetFaqNotifications from '../../../hooks/useGetFaqNotifications';

import styles from './styles.module.css';

function CogoAssist() {
	const {
		faqNotificationApiLoading,
		fetchFaqNotification,
		faqData,
		trigger,
	} = useGetFaqNotifications();

	return (
		<div className={styles.container}>
			<TopicList
				from="test_module"
				faqNotificationData={faqData}
				faqNotificationApiLoading={faqNotificationApiLoading}
				fetchFaqNotification={fetchFaqNotification}
				refetch={trigger}
			/>
		</div>
	);
}

export default CogoAssist;
