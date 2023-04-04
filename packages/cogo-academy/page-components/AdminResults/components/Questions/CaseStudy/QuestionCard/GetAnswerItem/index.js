import { IcMTick } from '@cogoport/icons-react';

import toFixed from '../../../../../../CreateModule/utils/toFixed';
import styles from '../styles.module.css';

function GetAnswerItem({ answer }) {
	const { answer_text = '', is_correct = false, peers = 0 } = answer;

	return (
		<div className={styles.answer_item}>
			<div className={styles.answer_header}>
				{peers ? <div className={styles.percentage_bar} style={{ width: `${peers}%` }} /> : null}

				<div className={styles.peer_percentage}>
					{toFixed(peers, 2)}
					{' '}
					% Peers
				</div>
			</div>

			<div className={styles.answer_text_container}>
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
}
export default GetAnswerItem;
