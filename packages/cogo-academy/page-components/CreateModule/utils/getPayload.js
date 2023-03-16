function getPayload({ values, type, questionSetId, action }) {
	switch (type) {
		case 'stand_alone': {
			const { audience_ids, question = [], topic } = values || {};

			const {
				question_type,
				difficulty_level,
				question_text,
				options = [],
			} = question?.[0] || {};

			const answers = options.map((item, index) => {
				const { is_correct } = item || {};

				return {
					...item,
					is_correct      : is_correct === 'true',
					status          : 'active',
					explanation     : [],
					sequence_number : index,
				};
			});

			return {
				...(action === 'update' ? { id: questionSetId } : { test_question_set_id: questionSetId }),
				audience_ids,
				question_type,
				topic,
				difficulty_level,
				question_text,
				answers,
			};
		}

		case 'case_study': {
			const { audience_ids, question_text, case_questions = [], topic, question_type } = values || {};

			console.log('case_questions', case_questions);

			const questions = case_questions.map((item) => {
				const {
					question_type: indQuestionType,
					difficulty_level,
					question_text: indQuestionText,
					options,
				} = item || {};

				const answers = options.map((option, index) => {
					const { is_correct, answer_text } = option || {};

					return {
						answer_text,
						is_correct      : is_correct === 'true',
						status          : 'active',
						explanation     : [],
						sequence_number : index,
					};
				});

				return {
					question_type: indQuestionType, difficulty_level, question_text: indQuestionText, answers,
				};
			});

			return {
				test_question_set_id: questionSetId,
				audience_ids,
				question_text,
				topic,
				question_type,
				questions,
			};
		}

		default:
			return null;
	}
}

export default getPayload;
