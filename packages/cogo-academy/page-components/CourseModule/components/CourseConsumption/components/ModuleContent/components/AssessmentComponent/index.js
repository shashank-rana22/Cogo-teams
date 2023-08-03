import styles from './styles.module.css';

function AssessmentComponent({
	state,
	chapter_content,
	user_submission,
	editorError,
	editorValue,
	handleChange,
	RichTextEditor,
}) {
	if (state === 'completed') {
		return (
			<div className={styles.display_assesment}>
				<div className={styles.question}>
					<div>Question : &nbsp;</div>
					<div
						dangerouslySetInnerHTML={{ __html: chapter_content }}
						className={styles.flex}
					/>
				</div>
				<div className={styles.answer}>
					<div>Answer : &nbsp;</div>
					<div
						dangerouslySetInnerHTML={{ __html: user_submission }}
						className={styles.flex}
					/>
				</div>
			</div>
		);
	}

	return (
		<div className={styles.rte}>
			<div className={styles.display_assesment}>
				<div className={styles.question}>
					<div>Question : &nbsp;</div>
					<div
						dangerouslySetInnerHTML={{ __html: chapter_content }}
						className={styles.flex}
					/>
				</div>
			</div>

			<RichTextEditor
				value={editorValue}
				onChange={handleChange}
				required
				id="body-text"
				name="bodyText"
				type="string"
				multiline
				variant="filled"
				className={styles.text_editor}
				rootStyle={{
					minWidth  : '80%',
					minHeight : '300px',
				}}
			/>

			{editorError && <span className={styles.errors}>Answer is required</span>}
		</div>
	);
}

export default AssessmentComponent;
