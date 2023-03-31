import useListTestCaseStudyQuestions from '../../hooks/useListTestCaseStudyQuestions';

import Header from './Header';
import ViewQuestionItem from './ViewQuestionItem';

function ViewQuestions({ question_id = '', test_id = '' }) {
	const { data = {} } = useListTestCaseStudyQuestions({ test_id, question_id });

	const { list = [] } = data;

	return (
		<div>
			<Header />

			{list.map((item) => (
				<ViewQuestionItem
					key={item.id}
					question_item={item}
					test_id={test_id}
				/>
			))}
		</div>

	);
}

export default ViewQuestions;
