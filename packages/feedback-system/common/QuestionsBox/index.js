import { Tooltip } from '@cogoport/components';

import styles from './styles.module.css';

function QuestionsBox({ question_detail = {} }) {
	const { question = '', weight = '', remark = '' } = question_detail || {};
	return (
		<div className={styles.container}>
			<div className={styles.question_section}>
				<p>Question</p>

				<div className={styles.question}>
					<Tooltip
						theme="light"
						placement="top"
						animation="shift-away"
						content={question}
					>
						<div className={styles.question}>{question}</div>
					</Tooltip>
				</div>
			</div>

			<div className={styles.remark}>
				<p>Remark</p>

				<div className={styles.question}>
					<Tooltip
						theme="light"
						placement="top"
						animation="shift-away"
						content={remark}
					>
						<div className={styles.question}>{remark}</div>
					</Tooltip>
				</div>
			</div>

			<div className={styles.weightage}>
				<p>Weightage</p>

				<div className={styles.question}>
					{weight}
				</div>
			</div>
		</div>
	);
}

export default QuestionsBox;
