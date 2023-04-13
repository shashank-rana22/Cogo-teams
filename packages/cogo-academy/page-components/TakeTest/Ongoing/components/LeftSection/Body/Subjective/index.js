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
}) {
	// console.log(subjectiveAnswer);

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
					{question_type}
				</p>
			</div>
			<div className={styles.question}>
				Subjective Answer (Type your Answer or Upload)
			</div>
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
						rootStyle={{
							zIndex    : 0,
							position  : 'relative',
							minHeight : '200px',
						}}
					/>
				</div>
			</div>
		</div>
	);
}
export default Subjective;
