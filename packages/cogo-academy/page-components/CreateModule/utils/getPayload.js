function getPayload({ values, type, questionSetId, action, testQuestionId, editType, caseStudyQuestionId }) {
	switch (type) {
		case 'stand_alone': {
			const { audience_ids, question = [], topic } = values || {};

			const {
				question_type,
				difficulty_level,
				question_text,
				options = [],
				explanation,
			} = question?.[0] || {};

			const answers = options.map((item, index) => {
				const { is_correct } = item || {};

				return {
					...item,
					is_correct      : is_correct === 'true',
					status          : 'active',
					sequence_number : index,
				};
			});

			return {
				...(action === 'update' ? { id: testQuestionId } : { test_question_set_id: questionSetId }),
				audience_ids,
				question_type,
				topic,
				difficulty_level,
				question_text,
				explanation: [explanation],
				answers,
			};
		}

		case 'case_study': {
			if (editType === 'case_question') {
				const { question_text, options = [], question_type, explanation } = values || {};

				const answers = options.map((option, index) => {
					const { is_correct, answer_text } = option || {};

					return {
						answer_text,
						is_correct      : is_correct === 'true',
						status          : 'active',
						sequence_number : index,
					};
				});

				return {
					...(action === 'update' ? { id: caseStudyQuestionId } : { test_question_id: testQuestionId }),
					question_text,
					question_type,
					answers,
					explanation: [explanation],
				};
			}
			const {
				audience_ids,
				question_text,
				case_questions = [],
				topic,
				question_type,
				difficulty_level,
			} = values || {};

			const questions = case_questions.map((item) => {
				const {
					question_type: indQuestionType,
					question_text: indQuestionText,
					options,
					explanation,
				} = item || {};

				const answers = options.map((option, index) => {
					const { is_correct, answer_text } = option || {};

					return {
						answer_text,
						is_correct      : is_correct === 'true',
						status          : 'active',
						sequence_number : index,
					};
				});

				return {
					question_type : indQuestionType,
					question_text : indQuestionText,
					answers,
					explanation   : [explanation],
				};
			});

			return {
				test_question_set_id: questionSetId,
				audience_ids,
				question_text,
				topic,
				question_type,
				difficulty_level,
				questions,
			};
		}

		default:
			return null;
	}
}

export default getPayload;
