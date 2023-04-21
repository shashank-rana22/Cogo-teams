import FileUploader from '@cogoport/forms/page-components/Business/FileUploader';
import { startCase } from '@cogoport/utils';
import { useEffect } from 'react';

import styles from './styles.module.css';

let RichTextEditor;

if (typeof window !== 'undefined') {
	// eslint-disable-next-line global-require
	RichTextEditor = require('react-rte').default;
}

function Subjective({
	question = {},
	currentQuestion, total_question,
	subjectiveAnswer, setSubjectiveAnswer,
	uploadValue,
	setUploadValue,
}) {
	const { question_text, question_type, test_question_answers = [], allow_file_upload } = question;
	const { subjective_answer_text = '', subjective_file_url = null } = test_question_answers[0] || {};

	useEffect(() => {
		setSubjectiveAnswer(RichTextEditor?.createValueFromString((subjective_answer_text || ''), 'html') || '');
		// setUploadValue(subjective_file_url || '');
	}, [subjective_answer_text, setSubjectiveAnswer, setUploadValue]);

	return (
		<div className={styles.main_container}>
			<div className={styles.container}>
				<div className={styles.question_count}>
					Question
					{' '}
					{currentQuestion}
					{' '}
					of
					{' '}
					{total_question}
				</div>
				<p className={styles.question_type}>
					{' '}
					{startCase(question_type)}
				</p>
			</div>
			{
                allow_file_upload && (
	<div className={styles.question}>
		Either Type or Upload your answer. Do not try to do both. It may lead to miscalculation of your marks.
	</div>
                )
			}

			<div className={styles.subjective_part}>
				<div className={styles.question_01}>
					<p>Q</p>
					<div className={styles.text}>{question_text}</div>
				</div>
				<div>
					<div className={styles.subjective_editor}>
						<RichTextEditor
							value={subjectiveAnswer}
							onChange={((val) => { setSubjectiveAnswer(val); })}
							required
							id="body-text"
							name="bodyText"
							type="string"
							multiline
							variant="filled"
							placeholder="Start Typing Here..."
							rootStyle={{
								zIndex    : 0,
								position  : 'relative',
								minHeight : '200px',
							}}
						/>
					</div>
					{
                    allow_file_upload === true && (
	<div className={styles.uploader}>
		<FileUploader
			name="upload"
			key="upload_questions"
			value={uploadValue}
			defaultValues={subjective_file_url}
			onChange={(e) => setUploadValue(e)}
		/>
	</div>
                    )
                }

				</div>
			</div>
		</div>
	);
}
export default Subjective;
