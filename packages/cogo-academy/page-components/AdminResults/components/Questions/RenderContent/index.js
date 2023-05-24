import CaseStudy from '../CaseStudy';
import ListHeader from '../ListHeader';
import QuestionItem from '../QuestionItem';
import SubjectiveQuestions from '../SubjectiveQuestions';

const COMPONENT_MAPPING = {
	stand_alone_questions : QuestionItem,
	case_study_based      : CaseStudy,
	subjective            : SubjectiveQuestions,
};

function RenderContent({ questionsList = [], test_id = '', activeTab = '' }) {
	return (
		<>
			{activeTab !== 'case_study_based' ? <ListHeader type={activeTab} /> : null}

			{(questionsList || []).map((question_item, index) => {
				const ActiveComponent = COMPONENT_MAPPING?.[activeTab];

				return (
					<ActiveComponent
						key={question_item.id}
						question_item={question_item}
						index={index}
						test_id={test_id}
					/>
				);
			})}
		</>
	);
}
export default RenderContent;
