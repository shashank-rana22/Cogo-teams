import useGetTestResultQuestion from '../../hooks/useGetTestResultQuestion';

import GetAnswerItem from './GetAnswerItem';
import styles from './styles.module.css';

function QuestionCard({ question_id = '', test_id = '', index = 0 }) {
	const { data = {} } = useGetTestResultQuestion({ test_id, question_id });

	const { answers = [], question_data = {} } = data || {};
	const { question = '' } = question_data || {};

	return (
		<div className={styles.container}>
			<div className={styles.card_header}>
				<div className={styles.question_heading}>
					<div className={styles.question_number}>
						Q
						{index + 1}
					</div>

					<div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
						<div className={styles.question_text}>{question}</div>
					</div>
				</div>
			</div>

			<div className={styles.answers_container}>
				{answers.map((item) => (<GetAnswerItem answer={item} key={item.answer_id} />))}
			</div>
		</div>
	);
}

export default QuestionCard;
