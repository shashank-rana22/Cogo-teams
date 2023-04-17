import FileUploader from '@cogoport/forms/page-components/Business/FileUploader';
import { startCase } from '@cogoport/utils';

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
	upload = true,
	uploadValue,
	setUploadValue,
}) {
	const { question_text, question_type } = question;

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
                upload === true && (
	<div className={styles.question}>
		Either Type or Upload your answer. Do not try to do both. It may lead to miscalculation of your marks.
	</div>
                )
            }

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
                    upload === true && (
	<div className={styles.uploader}>
		<FileUploader
			name="upload"
			key="upload_questions"
			value={uploadValue}
			onChange={(e) => setUploadValue(e)}
		/>
	</div>
                    )
                }

			</div>
		</div>
	);
}
export default Subjective;
