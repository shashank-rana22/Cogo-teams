import { Button } from '@cogoport/components';

import styles from './styles.module.css';
import useUpdateAnswers from './useUpdateAnswers';

function Footer({
	currentQuestion,
	total_question,
	fetchQuestions,
	...restProps
}) {
	const {
		handleLeaveTest,
		handleUpdate,
		loading,
	} = useUpdateAnswers({
		currentQuestion,
		total_question,
		fetchQuestions,
		...restProps,
	});

	return (
		<div className={styles.container}>
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
					onClick={() => handleUpdate({ type: 'marked_for_review' })}
				>
					Mark for Review
				</Button>

				<Button
					loading={loading}
					disabled={currentQuestion > total_question}
					onClick={() => handleUpdate({ type: 'save_and_next' })}
				>
					{currentQuestion === total_question ? <>Save</> : <>Save & Next</>}
				</Button>
			</div>
		</div>
	);
}

export default Footer;
