import { Button } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import { useState } from 'react';

import useUpdateAnswerQuestion from '../../../hooks/useUpdateAnswerStatus';

import LeaveTest from './LeaveTest';
import styles from './styles.module.css';

function Footer({ data = [], currentQuestion, setCurrentQuestion, total_question, answer, fetchQuestions }) {
	const [leaveTest, setLeaveTest] = useState(false);
	const { loading, updateAnswerList } = useUpdateAnswerQuestion({ fetchQuestions });

	const sendAnswer = async () => {
		if (isEmpty(answer)) {
			// Toast.error('Select Correct Answers');
			// return;
			const arr = [];
			const str = 'not_answered';
			await updateAnswerList(data?.id, arr, str);
		} else if (typeof answer === 'string') {
			const arr = [answer];
			const str = 'answered';
			await updateAnswerList(data?.id, arr, str);
		} else {
			const str = 'answered';
			await updateAnswerList(data?.id, answer, str);
		}
		const num = Number(currentQuestion);
		localStorage.setItem('currentQuestion', total_question > currentQuestion ? num + 1 : num);

		fetchQuestions({
			currentQ:
				total_question !== currentQuestion
					? Number(currentQuestion) + 1
					: currentQuestion,
		});

		setCurrentQuestion((pv) => {
			if (total_question !== pv) {
				return Number(pv) + 1;
			}
			return pv;
		});
	};

	const markAsReview = async () => {
		const str = 'marked_for_review';
		if (isEmpty(answer)) {
			const arr = [];
			await updateAnswerList(data?.id, arr, str);
		}
		if (typeof answer === 'string') {
			const arr = [answer];
			await updateAnswerList(data?.id, arr, str);
		} else {
			await updateAnswerList(data?.id, answer, str);
		}
		const num = Number(currentQuestion);
		localStorage.setItem('currentQuestion', total_question > currentQuestion ? num + 1 : num);

		fetchQuestions({
			currentQ:
				total_question !== currentQuestion
					? Number(currentQuestion) + 1
					: currentQuestion,
		});

		setCurrentQuestion((pv) => {
			if (total_question !== pv) {
				return Number(pv) + 1;
			}
			return pv;
		});
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
