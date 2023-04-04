import { Textarea, Button, Input } from '@cogoport/components';

import useCreateFaqQuestion from '../useCreateFaqQuestion';

import styles from './styles.module.css';

function RelatedQuestions({
	searchQuestion,
	setSearchQuestion = () => {},
	answer,
	setAnswer = () => {},
	setShow = () => {},
	setQuestionCreated = () => {},
}) {
	const { createFaqQuestion, createQuestionloading } = useCreateFaqQuestion({
		searchQuestion,
		setShow,
		setQuestionCreated,
		answer,
	});

	return (
		<div className={styles.input_component}>
			<div>
				<div className={styles.header}>
					Request An Answer
				</div>
				<div>
					<div className={styles.input_heading}>Name of the Question</div>
					<Input
						value={searchQuestion}
						size="md"
						style={{ marginRight: '8px', width: '100%' }}
						onChange={(e) => setSearchQuestion(e)}
					/>
				</div>

				<div>
					<div className={styles.input_heading}>
						If you have an answer suggestion,
						enter below
						{' '}
						<span className={styles.span}>
							(Optional)
						</span>
					</div>

					<div className={styles.answer_container}>
						<Textarea
							value={answer}
							onChange={(val) => setAnswer(val)}
							size="md"
							placeholder="Enter Answer"
						/>
					</div>
				</div>
			</div>

			<div className={styles.button_row}>
				<Button
					size="md"
					themeType="secondary"
					onClick={() => setShow(false)}
					disabled={createQuestionloading}
				>
					Cancel
				</Button>

				<Button
					loading={createQuestionloading}
					size="md"
					type="submit"
					themeType="primary"
					onClick={createFaqQuestion}
					className={styles.submit_btn}
				>
					Submit
				</Button>
			</div>
		</div>
	);
}

export default RelatedQuestions;
