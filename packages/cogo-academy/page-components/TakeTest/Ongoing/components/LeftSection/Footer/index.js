import { Toast, Button } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import { useState } from 'react';

import useUpdateAnswerQuestion from '../../../hooks/useUpdateAnswerStatus';

import LeaveTest from './LeaveTest';
import styles from './styles.module.css';

function Footer({ data = [], currentQuestion, setCurrentQuestion, total_question, answer }) {
	const [leaveTest, setLeaveTest] = useState(false);
	const { loading, updateAnswerList } = useUpdateAnswerQuestion();

	const sendAnswer = () => {
		if (isEmpty(answer)) {
			// Toast.error('Select Correct Answers');
			// return;
			const arr = [];
			const str = 'not_answered';
			updateAnswerList(data?.id, arr, str);
		} else if (typeof answer === 'string') {
			const arr = [answer];
			const str = 'answered';
			updateAnswerList(data?.id, arr, str);
		} else {
			const str = 'answered';
			updateAnswerList(data?.id, answer, str);
		}
		const num = Number(currentQuestion);
		localStorage.setItem('currentQuestion', num + 1);
		setCurrentQuestion((pv) => Number(pv) + 1);
	};

	const markAsReview = () => {
		const str = 'marked_for_review';
		if (isEmpty(answer)) {
			const arr = [];
			updateAnswerList(data?.id, arr, str);
		}
		if (typeof answer === 'string') {
			const arr = [answer];
			updateAnswerList(data?.id, arr, str);
		} else {
			updateAnswerList(data?.id, answer, str);
		}
		const num = Number(currentQuestion);
		localStorage.setItem('currentQuestion', num + 1);
		setCurrentQuestion((pv) => Number(pv) + 1);
	};

	return (
		<div className={styles.container}>
			<div className={styles.button_container}>

				<Button loading={loading} themeType="secondary" onClick={() => setLeaveTest(true)}>Leave Test</Button>

				<div className={styles.right_button_container}>
					<Button
						themeType="secondary"
						loading={loading}
						style={{ marginRight: 12 }}
						onClick={() => markAsReview()}
					>
						Mark for Review

					</Button>

					<Button
						loading={loading}
						disabled={currentQuestion > total_question}
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
