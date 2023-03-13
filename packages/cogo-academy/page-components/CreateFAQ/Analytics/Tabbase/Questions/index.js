import AllQuestionCardView from './AllQuestionCardView';
import Filter from './Filter';
import QuestionList from './QuestionList';

function Questions() {
	return (
		<div>
			<Filter />
			<AllQuestionCardView />
			<QuestionList />
		</div>

	);
}

export default Questions;
