import { InputController, CheckboxController, TextAreaController } from '@cogoport/forms';
import React from 'react';

import styles from './styles.module.css';

function FeedbackForm({
	control,
	watchQuestionCheckbox,
	watchAnswerCheckbox,
	answerData,
}) {
	return (
		<div className={styles.container}>
			<section className={styles.section_container}>
				<CheckboxController
					control={control}
					name="question_checkbox"
					type="checkbox"
					label="Question not satisfactory"
					checked={watchQuestionCheckbox}
					style={{ marginBottom: 12 }}
				/>

				{watchQuestionCheckbox ? (
					<section className={styles.watch_checkbox}>
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
					checked={watchAnswerCheckbox}
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
				/>
			</div>
		</div>
	);
}

export default FeedbackForm;
