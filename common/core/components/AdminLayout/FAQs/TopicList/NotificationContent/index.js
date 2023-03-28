import { IcMDocument } from '@cogoport/icons-react';
import { format } from '@cogoport/utils';

import Loader from '../../Loader';
import Answer from '../../QuestionList/Answer';

import styles from './styles.module.css';
import useClearFaqNotifications from './useClearFaqNotifications';

function NotificationContent({
	faqNotificationData,
	question,
	setQuestion,
	setShowNotificationContent,
	faqNotificationApiLoading,
}) {
	const { onClickClearNotifications = () => {} } = useClearFaqNotifications({
		setShowNotificationContent,
		faqNotificationData,
	});

	const filteredObject = {};

	const today = new Date();
	const formatToday = format(today, 'dd MMMM');
	const yesterday = new Date(today.getTime() - 86400000); // 86400000 is the number of milliseconds in a day
	const formatYesterday = format(yesterday, 'dd MMMM');

	(faqNotificationData || []).forEach((ele) => {
		const { created_at, question_abstract, id } = ele || {};
		const date = format(created_at, 'dd MMMM');
		const time = format(created_at, 'hh:mm aa');

		if (date && question_abstract) {
			if (!filteredObject[date]) {
				filteredObject[date] = [{ question_abstract, time, id }];
			} else {
				filteredObject[date].push({
					question_abstract,
					time,
					id,
				});
			}
		}
	});

	const sortedDates = Object.keys(filteredObject || {})
		.map((item) => item)
		.sort((a, b) => new Date(b).getTime() - new Date(a).getTime());

	const DAY_MAPPING = {
		[formatToday]     : 'Today',
		[formatYesterday] : 'Yesterday',
	};

	if (faqNotificationApiLoading) return <div className={styles.loader_wrapper}><Loader /></div>;

	if (question) {
		return <Answer question={question} setQuestion={setQuestion} />;
	}
	return (
		<div className={styles.container}>
			{sortedDates.map((ele) => (
				<div className={styles.question_division}>
					<div className={styles.header}>{DAY_MAPPING[ele] || ele}</div>
					{(filteredObject[ele] || []).map((a) => {
						const { question_abstract, time, id } = a || {};

						const selectedQuestion = (faqNotificationData || []).find(
							(element) => element.id === id,
						);
						return (
							<div
								className={styles.question_container}
								role="presentation"
								onClick={() => setQuestion(selectedQuestion)}
							>
								<div className={styles.icon_wrapper}>
									<IcMDocument width={25} height={25} />
								</div>

								<div style={{ cursor: 'pointer' }}>
									<div className={styles.answer_container}>Answer Added</div>

									<div className={styles.question_time_container}>
										<div className={styles.question_wrapper}>{question_abstract}</div>
										<div className={styles.time_wrapper}>{time}</div>
									</div>
								</div>
							</div>
						);
					})}
				</div>
			))}
			{(faqNotificationData || []).length > 0 && (
				<div className={styles.clear_update} role="presentation" onClick={onClickClearNotifications}>
					Clear Updates
				</div>
			)}
		</div>
	);
}

export default NotificationContent;
