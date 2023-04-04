import { Pagination, Placeholder } from '@cogoport/components';

import SingleQuestion from '../SingleQuestion';

import Paragraph from './Paragraph';
import styles from './styles.module.css';

function CaseStudy({
	question = {},
	currentQuestion,
	total_question,
	answer,
	setAnswer,
	loading,
	subQuestion,
	setSubQuestion,
}) {
	const { sub_questions } = question || {};

	if (loading) {
		<Placeholder height="40px" width="100%" />;
	}

	return (
		<div className={styles.main_container}>
			<div className={styles.pagination_container}>
				<div>Navigate to a particular case question</div>

				<Pagination
					type="number"
					currentPage={subQuestion}
					totalItems={sub_questions.length}
					pageSize={1}
					onPageChange={setSubQuestion}
				/>
			</div>

			<div className={styles.container}>
				<Paragraph content={question?.question_text} />

				<SingleQuestion
					question={sub_questions[subQuestion - 1]}
					currentQuestion={currentQuestion}
					total_question={total_question}
					answer={answer}
					setAnswer={setAnswer}
					loading={loading}
					subQuestion={subQuestion}
					from="case_study"
				/>
			</div>
		</div>

	);
}

export default CaseStudy;
