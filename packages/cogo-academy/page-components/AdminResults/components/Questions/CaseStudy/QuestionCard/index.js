import { Placeholder } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { isEmpty } from '@cogoport/utils';

import EmptyState from '../../../../../CreateModule/components/EmptyState';
import useGetTestResultQuestion from '../../hooks/useGetTestResultQuestion';

import GetAnswerItem from './GetAnswerItem';
import styles from './styles.module.css';

const OFFSET = 1;
const ARRAY_LENGTH = 3;

function QuestionCard({ question_id = '', test_id = '', index = 0 }) {
	const { data = {}, loading } = useGetTestResultQuestion({ test_id, question_id });

	const { answers = [], question_data = {} } = data || {};
	const { question = '', explanation } = question_data || {};

	const explanationHtmlString = explanation?.[GLOBAL_CONSTANTS.zeroth_index];

	if (loading) {
		return (
			<div className={styles.placeholder_container}>
				{[...Array(ARRAY_LENGTH).keys()].map((key) => (
					<div
						className={styles.placeholder_inner_container}
						key={key}
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
		<div className={styles.main_container}>
			<div className={styles.container}>
				<div className={styles.card_header}>
					<div className={styles.question_heading}>
						<div className={styles.question_number}>
							Q
							{index + OFFSET}
						</div>

						<div className={styles.display_question}>
							<div
								className={styles.question_text}
								dangerouslySetInnerHTML={{ __html: question }}
							/>
						</div>
					</div>
				</div>

				<div className={styles.answers_container}>
					{answers.map((item) => (<GetAnswerItem answer={item} key={item.answer_id} />))}
				</div>
			</div>

			{explanationHtmlString ? (
				<div className={styles.explanation}>
					<b>Explanation:</b>
					{' '}
					<div dangerouslySetInnerHTML={{ __html: explanationHtmlString }} />
				</div>
			) : null}
		</div>
	);
}

export default QuestionCard;
