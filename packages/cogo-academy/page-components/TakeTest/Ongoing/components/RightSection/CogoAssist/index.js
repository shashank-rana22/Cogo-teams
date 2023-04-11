import TopicList from '@cogoport/core/components/AdminLayout/FAQs/TopicList';

import styles from './styles.module.css';

function CogoAssist() {
	return (
		<div className={styles.container}>
			<TopicList
				from="test_module"
				faqNotificationApiLoading={false}
			/>
		</div>
	);
}

export default CogoAssist;
