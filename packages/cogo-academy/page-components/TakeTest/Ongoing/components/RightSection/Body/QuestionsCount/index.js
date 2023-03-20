import { Toast } from '@cogoport/components';

import styles from './styles.module.css';

function QuestionsCount({ data = [], setCurrentQuestion }) {
	const STATS_MAPPING = {
		answered          : '#DDEBC0',
		not_answered      : '#F8AEA8',
		marked_for_review : '#CED1ED',
		not_viewed        : '#FDFBF6',
	};
	const handleChangeQuestion = ({ index, answer_state }) => {
		if (answer_state !== 'not_viewed') {
			setCurrentQuestion(index + 1);
		} else {
			Toast.error('please answer previous question');
		}
	};

	return (
		<div className={styles.container}>
			{data?.data?.map((question, index) => {
				const { answer_state = '' } = question || {};

				return (
					(
						<div
							role="presentation"
							onClick={() => handleChangeQuestion({ index, answer_state })}
							style={{ backgroundColor: STATS_MAPPING[answer_state] }}
							className={styles.question_count}
						>
							{index + 1}
						</div>
					)
				);
			})}
		</div>
	);
}

export default QuestionsCount;
