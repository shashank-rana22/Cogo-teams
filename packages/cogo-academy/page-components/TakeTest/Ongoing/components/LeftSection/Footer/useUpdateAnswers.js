import { useSelector } from '@cogoport/store';
import { isEmpty } from '@cogoport/utils';

import handleMinimizeTest from '../../../../utils/handleMinimizeTest';
import useUpdateAnswerQuestion from '../../../hooks/useUpdateAnswerStatus';

const getAnswerState = ({ type, answer }) => {
	let answerState = 'answered';

	if (type === 'marked_for_review') {
		answerState = type;
	} else if (isEmpty(answer)) {
		answerState = 'viewed';
	}

	return answerState;
};

function useUpdateAnswers({
	setShowLeaveTestModal,
	answer = [],
	test_user_mapping_id,
	subQuestion,
	data,
	setSubQuestion,
	setCurrentQuestion,
	currentQuestion,
	user_appearance = [],
	fetchQuestions,
	total_question,
}) {
	const {
		query: { test_id },
		user: { id: user_id },
	} = useSelector(({ general, profile }) => ({
		query : general.query,
		user  : profile.user,
	}));

	const { question_type, sub_questions = [] } = data || {};

	const { loading, updateAnswerList } = useUpdateAnswerQuestion({ test_user_mapping_id });

	const handleUpdate = async ({ type }) => {
		const answerState = getAnswerState({ type, answer });

		let answerArray = answer;

		if (!isEmpty(answer) && typeof answer === 'string') {
			answerArray = [answer];
		}

		await updateAnswerList(
			{
				data,
				answerArray,
				answerState,
				subQuestion,
			},
		);

		if (question_type === 'case_study' && sub_questions.length > subQuestion) {
			setSubQuestion((prev) => prev + 1);
			fetchQuestions({ question_id: data?.id });
			return;
		}

		const num = Number(currentQuestion);

		localStorage.setItem(
			`current_question_${test_id}_${user_id}`,
			total_question > currentQuestion ? num + 1 : num,
		);

		if (['answered', 'marked_for_review'].includes((user_appearance?.[num - 1] || {}).answer_state)) {
			await fetchQuestions({ question_id: user_appearance?.[num]?.test_question_id });
		} else {
			await fetchQuestions({});
		}

		setCurrentQuestion((pv) => {
			if (total_question !== pv) {
				return Number(pv) + 1;
			}
			return pv;
		});
	};

	const handleLeaveTest = () => {
		handleMinimizeTest();
		setShowLeaveTestModal(true);
	};

	return {
		handleLeaveTest,
		handleUpdate,
		loading,
	};
}

export default useUpdateAnswers;
