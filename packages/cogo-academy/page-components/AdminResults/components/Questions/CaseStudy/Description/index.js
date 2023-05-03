import { IcMArrowRotateUp, IcMArrowRotateDown } from '@cogoport/icons-react';
import { useState } from 'react';

import ViewQuestions from '../ViewQuestions';

import styles from './styles.module.css';

function Description({ question_text = '', id = '', test_id = '', activeAttempt }) {
	const [viewQuestions, setViewQuestions] = useState(false);

	return (
		<div>
			<div className={styles.content_container}>
				<div className={styles.content}>
					{question_text}
				</div>

				<div
					className={styles.view_question}
					onClick={() => setViewQuestions((prev) => !prev)}
					role="presentation"
				>
					<div>
						{!viewQuestions ? <IcMArrowRotateDown /> : <IcMArrowRotateUp />}
					</div>

					<div className={styles.view_question_text}>See Question Wise Analysis</div>
				</div>
			</div>

			<div>
				{viewQuestions
					? (
						<ViewQuestions
							question_id={id}
							test_id={test_id}
							activeAttempt={activeAttempt}
						/>
					) : null}
			</div>
		</div>
	);
}

export default Description;
