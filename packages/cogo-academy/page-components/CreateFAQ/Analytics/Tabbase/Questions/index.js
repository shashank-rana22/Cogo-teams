import useListFaqQuestions from '../../../../FAQs/hooks/useListFaqQuestion';
import useListFaqStats from '../../hooks/useListFaqStats';

import AllQuestionCardView from './AllQuestionCardView';
import Filter from './Filter';
import QuestionList from './QuestionList';

function Questions() {
	const props = useListFaqStats({});
	console.log('mega', props);
	return (
		<div>
			<Filter />
			<AllQuestionCardView {...props?.data} />
		</div>

	);
}

export default Questions;
