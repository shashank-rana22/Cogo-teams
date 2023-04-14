import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { isEmpty } from '@cogoport/utils';

import handleMinimizeTest from '../../../../utils/handleMinimizeTest';

let RichTextEditor;

if (typeof window !== 'undefined') {
	// eslint-disable-next-line global-require
	RichTextEditor = require('react-rte').default;
}

const getAnswerState = ({ type, answer, subjectiveAnswer, question_type }) => {
	let answerState = 'answered';

	if (type === 'marked_for_review') {
		answerState = type;
	} else if (question_type === 'subjective' && subjectiveAnswer.toString('html') === '<p><br></p>') {
		answerState = 'viewed';
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
	subjectiveAnswer,
	uploadValue,
	setUploadValue,
	setSubjectiveAnswer = () => {},
}) {
	const {
		query: { test_id },
		user: { id: user_id },
	} = useSelector(({ general, profile }) => ({
		query : general.query,
		user  : profile.user,
	}));

	const [{ loading }, trigger] = useRequest({
		method : 'post',
		url    : '/update_test_user_question_response',
	}, { manual: true });

	const { id, question_type, sub_questions = [] } = data || {};

	const handleUpdate = async ({ type }) => {
		const answerState = getAnswerState({ type, answer, subjectiveAnswer, question_type });

		let answerArray = answer;

		if (!isEmpty(answer) && typeof answer === 'string') {
			answerArray = [answer];
		}

		const payload = {
			test_user_mapping_id,
			test_question_id : id,
			// test_question_answer_ids : answerArray || [],
			answer_state     : answerState,
			question_type,
			...(question_type === 'case_study'
				? { test_case_study_question_id: sub_questions?.[subQuestion - 1]?.id } : null),

			...(question_type === 'subjective'
				? { subjective_answer_text: subjectiveAnswer.toString('html') } : null),

			...(question_type === 'subjective'
				? { subjective_file_url: uploadValue } : null),

			...(question_type !== 'subjective'
				? { test_question_answer_ids: answerArray || [] } : null),

		};

		const res = await trigger({
			data: payload,
		});

		if (res?.status !== 200) {
			handleMinimizeTest();
			Toast.error('Something is wrong');
			return;
		}

		if (total_question === currentQuestion) {
			fetchQuestions({ question_id: data?.id });
			return;
		}

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

		if (['answered', 'marked_for_review', 'viewed'].includes((user_appearance?.[num - 1] || {}).answer_state)) {
			await fetchQuestions({ question_id: (user_appearance?.[num] || {})?.test_question_id || '' });
		} else {
			await fetchQuestions({});
		}

		setCurrentQuestion((pv) => {
			if (total_question !== pv) {
				return Number(pv) + 1;
			}
			return pv;
		});
		setSubQuestion(1);
		setSubjectiveAnswer(RichTextEditor.createEmptyValue());
		setUploadValue('');
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
