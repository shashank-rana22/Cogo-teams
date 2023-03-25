import { Popover, ProgressBar } from '@cogoport/components';
import { IcMTick } from '@cogoport/icons-react';
import React, { useState } from 'react';

import styles from './styles.module.css';

function QuestionCard({ question = '', answers = [], index = 0, question_type = '', case_study = '' }) {
	const [visible, setVisible] = useState(false);

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
					<div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
						<div className={styles.question_text}>{question}</div>
						{question_type === 'case_study' ? (

							<Popover placement="bottom" trigger="mouseenter" caret={false} render={case_study}>
								<div
									role="presentation"
									className={styles.case_study}
									onClick={() => setVisible(!visible)}
								>
									{' '}
									view case study

								</div>
							</Popover>
						)
							: null}
					</div>
				</div>
			</div>
			<div className={styles.answers_container}>
				{answers.map((item) => (getAnswerItem(item)))}
			</div>
		</div>
	);
}

export default QuestionCard;
