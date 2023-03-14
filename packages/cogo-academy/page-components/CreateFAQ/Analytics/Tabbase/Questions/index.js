import useListFaqQuestions from '../../../../FAQs/hooks/useListFaqQuestion';

import AllQuestionCardView from './AllQuestionCardView';
import Filter from './Filter';
import QuestionList from './QuestionList';

function Questions() {
	const props = useListFaqQuestions({});
	return (
		<div>
			<Filter />
			<AllQuestionCardView {...props} />
		</div>

	);
}

export default Questions;
