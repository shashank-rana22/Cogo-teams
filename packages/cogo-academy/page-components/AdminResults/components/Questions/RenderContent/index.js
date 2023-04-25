import CaseStudy from '../CaseStudy';
import ListHeader from '../ListHeader';
import QuestionItem from '../QuestionItem';
import SubjectiveQuestions from '../SubjectiveQuestions';

const COMPONENT_MAPPING = {
	stand_alone_questions: {
		component: QuestionItem,
	},

	case_study_based: {
		component: CaseStudy,
	},
	subjective: {
		component: SubjectiveQuestions,
	},

};

function RenderContent({ questionsList = [], test_id = '', activeTab = '' }) {
	return (
		<>
			{activeTab !== 'case_study_based' ? (<ListHeader type={activeTab} />) : null}

			{(questionsList || []).map((question_item, index) => {
				const { component: ActiveComponent = null } = COMPONENT_MAPPING[activeTab];
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
