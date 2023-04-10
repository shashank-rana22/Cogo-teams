import CaseStudy from '../CaseStudy';
import ListHeader from '../ListHeader';
import QuestionItem from '../QuestionItem';

function RenderContent({ questionsList = [], test_id = '', activeTab = '' }) {
	if (activeTab === 'stand_alone_questions') {
		return (
			<>
				<ListHeader />

				{(questionsList || []).map((question_item, index) => (
					<QuestionItem
						key={question_item.id}
						question_item={question_item}
						index={index}
						test_id={test_id}
					/>
				))}
			</>
		);
	}

	return (
		<>
			{(questionsList || []).map((question_item, index) => (
				<CaseStudy key={question_item.id} question_item={question_item} index={index} test_id={test_id} />
			))}
		</>
	);
}
export default RenderContent;
