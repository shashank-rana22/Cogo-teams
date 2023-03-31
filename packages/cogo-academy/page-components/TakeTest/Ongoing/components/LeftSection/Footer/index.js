import { Button } from '@cogoport/components';
import { useSelector } from '@cogoport/store';
import { isEmpty } from '@cogoport/utils';

import handleMinimizeTest from '../../../../utils/handleMinimizeTest';
import useUpdateAnswerQuestion from '../../../hooks/useUpdateAnswerStatus';

import styles from './styles.module.css';

function Footer({
	data = [],
	currentQuestion,
	setCurrentQuestion,
	total_question,
	answer,
	fetchQuestions,
	setShowLeaveTestModal,
}) {
	const {
		query: { test_id },
		user: { id: user_id },
	} = useSelector(({ general, profile }) => ({
		query : general.query,
		user  : profile.user,
	}));

	const { loading, updateAnswerList } = useUpdateAnswerQuestion({ fetchQuestions });

	const sendAnswer = async () => {
		if (isEmpty(answer)) {
			const arr = [];
			const str = 'not_answered';
			await updateAnswerList(data, arr, str);
		} else if (typeof answer === 'string') {
			const arr = [answer];
			const str = 'answered';
			await updateAnswerList(data, arr, str);
		} else {
			const str = 'answered';
			await updateAnswerList(
				data,
				answer,
				str,
			);
		}

		const num = Number(currentQuestion);

		localStorage.setItem(
			`current_question_${test_id}_${user_id}`,
			total_question > currentQuestion ? num + 1 : num,
		);

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
			await updateAnswerList(data, arr, str);
		}
		if (typeof answer === 'string') {
			const arr = [answer];
			await updateAnswerList(data, arr, str);
		} else {
			await updateAnswerList(data, answer, str);
		}

		const num = Number(currentQuestion);

		localStorage.setItem(
			`current_question_${test_id}_${user_id}`,
			total_question > currentQuestion ? num + 1 : num,
		);

		setCurrentQuestion((pv) => {
			if (total_question !== pv) {
				return Number(pv) + 1;
			}
			return pv;
		});
	};

	const handleLeaveTest = () => {
		handleMinimizeTest();
		setShowLeaveTestModal(true);
	};

	return (
		<div className={styles.container}>
			<div className={styles.button_container}>

				<Button
					type="button"
					loading={loading}
					themeType="secondary"
					onClick={handleLeaveTest}
				>
					Leave Test
				</Button>

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
						{currentQuestion === total_question ? <>Save</> : <>Save & Next</>}
					</Button>
				</div>
			</div>
		</div>
	);
}

export default Footer;
