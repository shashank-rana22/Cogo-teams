import { ProgressBar } from '@cogoport/components';
import { IcMTick } from '@cogoport/icons-react';
import React from 'react';

import styles from './styles.module.css';

function QuestionCard({ question = '', answers = [], index = 0 }) {
	const getAnswerItem = (answer) => {
		const { answer_text = '', is_correct = false, peers = 0 } = answer;
		return (
			<div className={styles.answer_item}>
				<div className={styles.answer_header}>
					{peers > 0 ? (
						<div className={styles.percentage_bar} style={{ width: `${peers}%` }} />
					) : null}
					<div className={styles.peer_percentage}>
						{peers.toFixed(2)}
						{' '}
						% Peers
					</div>
				</div>
				<div className={styles.answer_text_container}>
					{is_correct ? (
						<div className={styles.answer_svg}>
							<IcMTick />
						</div>
					) : null}

					<div className={`${styles.answer_text} ${is_correct && styles.correct_answer}`}>
						{answer_text}
					</div>
				</div>
			</div>
		);
	};
	return (
		<div className={styles.container}>
			<div className={styles.card_header}>
				<div className={styles.question_heading}>
					<div className={styles.question_number}>
						Q
						{index + 1}
					</div>
					<div className={styles.question_text}>{question}</div>
				</div>
			</div>
			<div className={styles.answers_container}>
				{answers.map((item) => (getAnswerItem(item)))}
			</div>
		</div>
	);
}

export default QuestionCard;
