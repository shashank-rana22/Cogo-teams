import CaseStudy from '../CaseStudy';
import ListHeader from '../ListHeader';
import QuestionItem from '../QuestionItem';
import SubjectiveQuestions from '../SubjectiveQuestions';

function RenderContent({ questionsList = [], test_id = '', activeTab = '' }) {
	if (activeTab === 'stand_alone_questions') {
		return (
			<>
				<ListHeader type={activeTab} />

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

	if (activeTab === 'case_study_based') {
		return (
			<>
				{(questionsList || []).map((question_item, index) => (
					<CaseStudy key={question_item.id} question_item={question_item} index={index} test_id={test_id} />
				))}

			</>
		);
	}

	return (
		<>
			<ListHeader type={activeTab} />
			{(questionsList || []).map((question_item, index) => (
				<SubjectiveQuestions
					key={question_item.id}
					question_item={question_item}
					index={index}
					test_id={test_id}
				/>
			))}
		</>
	);
}
export default RenderContent;
