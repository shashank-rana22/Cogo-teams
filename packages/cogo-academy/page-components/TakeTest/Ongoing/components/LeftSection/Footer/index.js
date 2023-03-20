import { Button } from '@cogoport/components';
import { useState } from 'react';

import useUpdateAnswerQuestion from '../../../hooks/useUpdateAnswerStatus';

import LeaveTest from './LeaveTest';
import styles from './styles.module.css';

function Footer({ data = [], currentQuestion, setCurrentQuestion, total_question, answer }) {
	const [leaveTest, setLeaveTest] = useState(false);
	const { loading, updateAnswerList } = useUpdateAnswerQuestion();
	// console.log('asdfg', data);

	const sendAnswer = () => {
		if (typeof answer === 'string') {
			const arr = [answer];
			const str = 'answered';
			updateAnswerList(data?.id, arr, str);
		} else {
			const str = 'answered';
			updateAnswerList(data?.id, answer, str);
		}
		setCurrentQuestion((pv) => pv + 1);
	};

	const markAsReview = () => {
		if (typeof answer === 'string') {
			const arr = [answer];
			const str = 'answered';
			updateAnswerList(data?.id, arr, str);
		} else {
			const str = 'answered';
			updateAnswerList(data?.id, answer, str);
		}
		setCurrentQuestion((pv) => pv + 1);
	};
	return (
		<div className={styles.container}>
			<div className={styles.button_container}>

				<Button themeType="secondary" onClick={() => setLeaveTest(true)}>Leave Test</Button>

				<div className={styles.right_button_container}>
					<Button
						themeType="secondary"
						style={{ marginRight: 12 }}
						onClick={() => markAsReview()}
					>
						Mark for Review

					</Button>

					<Button
						disabled={currentQuestion >= total_question}
						onClick={() => sendAnswer()}
					>
						Next
					</Button>
				</div>

			</div>
			{leaveTest ? <LeaveTest leaveTest={leaveTest} setLeaveTest={setLeaveTest} /> : null}
		</div>
	);
}

export default Footer;
