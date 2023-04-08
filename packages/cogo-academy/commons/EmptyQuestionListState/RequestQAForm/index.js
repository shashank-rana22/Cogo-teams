import { Button, Textarea, Input } from '@cogoport/components';

import useCreateQuestionSet from '../useCreateQuestionRequest';

import styles from './styles.module.css';

function RequestForm({
	searchquestion,
	setSearchquestion,
	answer,
	setAnswer,
	setShow,
	setQuestionCreated,
	source,
}) {
	const { createQuestionSet, createQuestionLoading } = useCreateQuestionSet({
		searchquestion, setShow, setQuestionCreated, answer,
	});

	return (
		<div
			className={styles.container}
			style={{ paddingLeft: source === 'list' ? '40px' : '0px' }}
		>
			<div className={styles.header}>
				Request An Answer
			</div>

			<div className={styles.input_label}>
				Name of the Question
			</div>

			<div className={styles.input_container}>
				<Input
					value={searchquestion}
					size="md"
					onChange={(value) => setSearchquestion(value)}

				/>
			</div>

			<div className={styles.input_label}>
				If you have an answer suggestion, enter below
				{' '}
				<span className={styles.span}>(Optional)</span>
			</div>

			<div className={styles.answer_container}>
				<Textarea
					value={answer}
					onChange={(val) => setAnswer(val)}
					size="md"
					placeholder="Enter Answer"
				/>
			</div>

			<div className={styles.button_container}>
				<div style={{ paddingRight: '16px' }}>
					<Button
						size="md"
						themeType="secondary"
						onClick={() => setShow(false)}
						disabled={createQuestionLoading}
					>
						Cancel
					</Button>
				</div>

				<Button
					size="md"
					themeType="primary"
					type="submit"
					loading={createQuestionLoading}
					onClick={createQuestionSet}
				>
					Submit
				</Button>
			</div>
		</div>
	);
}

export default RequestForm;
