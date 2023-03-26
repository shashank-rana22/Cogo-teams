import { useRequest } from '@cogoport/request';

import Filters from '../../commons/Filters';

import ListHeader from './ListHeader';
import QuestionItem from './QuestionItem';

function QuestionsComponent({ test_id }) {
	const [{ data, loading }] = useRequest({
		method : 'GET',
		url    : '/get_admin_question_wise_test_result',
		params : {
			test_id,
		},
	}, { manual: false });

	const { list: questionsList } = data || {};

	if (loading) { return 'loading'; }

	return (

		<>
			<Filters />

			<ListHeader />

			{questionsList?.map((question_item, index) => <QuestionItem question_item={question_item} index={index} />)}
		</>
	);
}

export default QuestionsComponent;
