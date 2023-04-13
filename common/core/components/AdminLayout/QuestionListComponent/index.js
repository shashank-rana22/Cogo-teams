import Loader from '../FAQs/Loader';
import QuestionList from '../FAQs/QuestionList';

import RenderComponent from './RenderComponent';

function QuestionListComponent({
	question,
	setQuestion,
	loading,
	search,
	faqNotificationApiLoading,
	paginationData,
	page,
	setPage,
	list,
	faqNotificationData,
	topic,
	setTopic,
	showHistory,
	setSearch,
	setShowHistory,
	fetchFaqNotification,
	showNotificationContent,
	setShowNotificationContent,
}) {
	if (loading) return <Loader />;

	if (search) {
		return (
			<QuestionList
				search={search}
				question={question}
				setQuestion={setQuestion}
			/>
		);
	}

	return (
		<RenderComponent
			faqNotificationApiLoading={faqNotificationApiLoading}
			paginationData={paginationData}
			page={page}
			setPage={setPage}
			list={list}
			faqNotificationData={faqNotificationData}
			question={question}
			topic={topic}
			setQuestion={setQuestion}
			setTopic={setTopic}
			showHistory={showHistory}
			setSearch={setSearch}
			setShowHistory={setShowHistory}
			fetchFaqNotification={fetchFaqNotification}
			setShowNotificationContent={setShowNotificationContent}
			showNotificationContent={showNotificationContent}
		/>
	);
}

export default QuestionListComponent;
