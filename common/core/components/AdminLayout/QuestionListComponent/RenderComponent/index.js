import { Tooltip, Pagination } from '@cogoport/components';
import { startCase } from '@cogoport/utils';

import History from '../../FAQs/History';
import QuestionList from '../../FAQs/QuestionList';
import HeaderText from '../../FAQs/TopicList/Header';
import IconMapping from '../../FAQs/TopicList/iconMapping';
import NotificationBar from '../../FAQs/TopicList/NotificationBar';

import styles from './styles.module.css';

const generalIcon = (
	<img
		src="https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/General.svg"
		alt="logo cogoport"
		className={styles.general_icon}
	/>
);

function RenderComponent({
	faqNotificationApiLoading,
	paginationData,
	page,
	setPage,
	list,
	faqNotificationData,
	question,
	topic,
	setQuestion,
	setTopic,
	showHistory,
	setShowHistory,
	setSearch,
	fetchFaqNotification,
	showNotificationContent,
	setShowNotificationContent,
}) {
	if (topic) {
		return (
			<QuestionList
				question={question}
				setQuestion={setQuestion}
				topic={topic}
				setTopic={setTopic}
			/>
		);
	}

	if (showHistory) {
		return (
			<History
				question={question}
				setQuestion={setQuestion}
				setShowHistory={setShowHistory}
				setSearch={setSearch}
			/>
		);
	}

	const renderIcon = ({ item }) => {
		const { name = '' } = item || {};

		let includesKey = '';
		Object.keys(IconMapping).forEach((key) => {
			if (name.includes(key)) {
				includesKey = key;
			}
		});

		const DisplayIcon = IconMapping[includesKey]?.icon || generalIcon;

		return <div className={styles.icon}>{DisplayIcon}</div>;
	};

	return (
		<div className={styles.container}>
			<NotificationBar
				faqNotificationData={faqNotificationData}
				question={question}
				setQuestion={setQuestion}
				showNotificationContent={showNotificationContent}
				setShowNotificationContent={setShowNotificationContent}
				faqNotificationApiLoading={faqNotificationApiLoading}
				fetchFaqNotification={fetchFaqNotification}
			/>

			{!showNotificationContent && (
				<div>
					<div>
						<HeaderText setShowHistory={setShowHistory} />
					</div>

					<div className={styles.display_topics}>
						{(list || []).map((item) => (
							<div
								key={item.id}
								role="presentation"
								onClick={() => setTopic(item)}
								className={styles.square_div}
							>
								<div className={styles.icon_grid}>
									{renderIcon({ item })}

									<div className={styles.display_name_and_topic}>
										<Tooltip
											theme="light"
											content={startCase(item?.display_name || '')}
											placement="bottom"
											animation="shift-away"
										>
											<div className={styles.display_name}>
												{startCase(item?.display_name || '')}
											</div>
										</Tooltip>
										<div className={styles.question_count}>
											{item?.question_count}
											{' '}
											Questions
										</div>
									</div>
								</div>
							</div>
						))}
					</div>

					{paginationData?.total_count > 20 && (
						<div className={styles.pagination_container}>
							<Pagination
								totalItems={paginationData?.total_count || 0}
								currentPage={page || 1}
								pageSize={paginationData?.page_limit}
								onPageChange={setPage}
							/>
						</div>
					)}
				</div>
			)}
		</div>
	);
}

export default RenderComponent;
