import { IcMArrowUp } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';

import NotificationContent from '../NotificationContent';

import styles from './styles.module.css';

function NotificationBar({
	faqNotificationData,
	question = {},
	setQuestion,
	showNotificationContent,
	setShowNotificationContent,
	faqNotificationApiLoading,
	fetchFaqNotification,
}) {
	return (
		<div>
			{!isEmpty(faqNotificationData) && isEmpty(question) && (
				<div
					className={styles.container}
					role="presentation"
					onClick={() => {
						setShowNotificationContent(!showNotificationContent);
					}}
				>
					<div className={styles.update_container}>
						<div className={styles.update_count}>
							{' '}
							{(faqNotificationData || []).length}
						</div>

						<div className={styles.text_wrapper}>
							You have
							{' '}
							<span className={styles.span}>New Updates!</span>

						</div>

					</div>

					<div className={styles.arrow_container}>
						<IcMArrowUp
							style={{
								transition : '0.3s',
								transform  : showNotificationContent
									? 'rotate(0deg)'
									: 'rotate(180deg)',
							}}
						/>
					</div>
				</div>

			)}

			{showNotificationContent ? (
				<NotificationContent
					faqNotificationData={faqNotificationData}
					question={question}
					setQuestion={setQuestion}
					setShowNotificationContent={setShowNotificationContent}
					faqNotificationApiLoading={faqNotificationApiLoading}
					fetchFaqNotification={fetchFaqNotification}
				/>
			) : null}
		</div>
	);
}

export default NotificationBar;
