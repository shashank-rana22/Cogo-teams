// import { Badge } from '@cogoport/components';
import { InputController, CheckboxController, TextAreaController } from '@cogoport/forms';
import React from 'react';

import styles from './styles.module.css';

function FeedbackForm({
	answerData = {},
	errors = {},
	control,
	answer,
	setAnswer,
	watch,
}) {
	const watchQuestionCheckbox = watch('question_checkbox');
	const watchAnswerCheckbox = watch('answer_checkbox');

	return (
		<div>
			<section className={styles.section_container}>
				<CheckboxController
					control={control}
					name="question_checkbox"
					type="checkbox"
					label="Question not satisfactory"
					style={{ marginBottom: 12 }}
				/>

				{watchQuestionCheckbox ? (
					<section>
						<h4>Rephrase the question (optional)</h4>

						<InputController
							control={control}
							name="question"
							type="text"
							placeholder="Enter text here"
							value={answerData?.question_abstract}
						/>
					</section>
				) : null}
			</section>

			<section className={styles.section_container}>
				<CheckboxController
					control={control}
					name="answer_checkbox"
					type="checkbox"
					label="Answer not satisfactory"
					style={{ marginBottom: 12 }}
				/>

				{watchAnswerCheckbox ? (
					<section>
						<h4>Rephrase the answer (optional)</h4>

						<TextAreaController
							control={control}
							name="answer"
							type="text"
							placeholder="Enter text here"
							value=""
						/>
					</section>
				) : null}
			</section>

			<div className={styles.remark}>
				<div className={styles.aftercheckbox}>Remarks (optional)</div>

				<InputController
					control={control}
					name="remark"
					type="text"
					placeholder="Enter remark here"
					rules={{ required: 'Remark is required' }}
				/>

				{errors.remark && (
					<span className={styles.errors}>
						{errors.remark.message}
					</span>
				)}
			</div>
		</div>
	);
}

export default FeedbackForm;
