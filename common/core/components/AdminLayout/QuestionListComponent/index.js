import QuestionList from '../FAQs/QuestionList';
import Loader from '../FAQs/TopicList/Loader';

import RenderComponent from './RenderComponent';

function QuestionListComponent({
	question,
	setQuestion,
	loading,
	search,
	from,
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
	setInput,
}) {
	if (search) {
		return (
			<QuestionList
				from={from}
				search={search}
				question={question}
				setQuestion={setQuestion}
			/>
		);
	}

	if (loading) return <Loader />;

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
			setInput={setInput}
		/>
	);
}

export default QuestionListComponent;
