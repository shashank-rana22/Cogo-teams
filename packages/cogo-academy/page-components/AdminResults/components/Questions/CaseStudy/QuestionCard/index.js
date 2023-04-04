import { Placeholder } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';

import EmptyState from '../../../../../CreateModule/components/EmptyState';
import useGetTestResultQuestion from '../../hooks/useGetTestResultQuestion';

import GetAnswerItem from './GetAnswerItem';
import styles from './styles.module.css';

function QuestionCard({ question_id = '', test_id = '', index = 0 }) {
	const { data = {}, loading } = useGetTestResultQuestion({ test_id, question_id });

	const { answers = [], question_data = {} } = data || {};
	const { question = '' } = question_data || {};

	if (loading) {
		return (
			<div className={styles.placeholder_container}>
				{Array(3).fill('').map(() => (
					<div
						className={styles.placeholder_inner_container}
					>
						<Placeholder height="24px" />
					</div>
				))}
			</div>
		);
	}

	if (isEmpty(answers)) {
		return <EmptyState />;
	}

	return (
		<div className={styles.container}>
			<div className={styles.card_header}>
				<div className={styles.question_heading}>
					<div className={styles.question_number}>
						Q
						{index + 1}
					</div>

					<div className={styles.display_question}>
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
