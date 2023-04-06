import { Avatar, Popover } from '@cogoport/components';
import { IcMTick } from '@cogoport/icons-react';
import React, { useState } from 'react';

import toFixed from '../../utils/toFixed';

import styles from './styles.module.css';

function QuestionCard({
	question = '',
	answers = [],
	user_answers = [],
	index = 0,
	question_type = '',
	case_study = '',
	user_name = '',
}) {
	const [visible, setVisible] = useState(false);

	const userAnswersArray = [...user_answers.map((item) => item.answer)];

	const getAnswerItem = (answer) => {
		const { answer_text = '', is_correct = false, peers = 0 } = answer;

		return (
			<div className={styles.answer_item}>

				<div className={styles.answer_header}>

					{peers > 0 ? (
						<div className={styles.percentage_bar} style={{ width: `${peers}%` }} />

					) : null}

					<div className={styles.peer_percentage}>
						{toFixed(peers, 2)}
						{' '}
						% Peers
					</div>
				</div>

				<div className={styles.answer_text_container}>
					{userAnswersArray.includes(answer_text) ? (
						<Avatar
							personName={user_name}
							className={styles.avatar}
							style={{ backgroundColor: `${is_correct ? '#849E4C' : '#BF291E'}` }}
						/>
					) : null}

					<div className={`${styles.answer_text} ${is_correct && styles.correct_answer}`}>
						{answer_text}
					</div>
					{is_correct ? (
						<div className={styles.answer_tick}>

							<IcMTick />
						</div>
					) : null}
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
