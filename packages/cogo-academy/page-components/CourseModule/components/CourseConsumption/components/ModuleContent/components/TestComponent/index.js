import { Button } from '@cogoport/components';

import styles from './styles.module.css';

const TEST_INDEX = 0;

function TestComponent({ tests = [], FormatTime, test_completed = false, onClickVisitTest = () => {}, viewType = '' }) {
	const {
		total_questions = 0,
		test_duration = 0,
		cut_off_percentage = 0,
		maximum_attempts = 1,
	} = tests[TEST_INDEX] || {};

	return (
		<div className={styles.container}>
			<h3>Course Completion Test</h3>

			<div className={styles.instruction}>
				<div className={styles.description_box}>
					<b>
						There is a timed test you need to Pass in order to complete this
						course.
					</b>
					&nbsp; It has been designed specifically to gauge your learnings
					from the course.
				</div>

				<div className={styles.test_details}>
					<div className={styles.data_box}>
						<div className={styles.data_display}>
							<span>No of Questions</span>
							<b>{total_questions}</b>
						</div>

						<div className={styles.data_display}>
							<span>Duration</span>
							<b>
								<FormatTime test_duration={test_duration} />
							</b>
						</div>

						<div className={styles.data_display}>
							<span>Attempts</span>
							<b>{maximum_attempts}</b>
						</div>

						<div className={styles.data_display}>
							<span>Required Pass %</span>
							<b>{cut_off_percentage}</b>
						</div>
					</div>

					{test_completed && viewType !== 'preview' ? (
						<Button
							type="button"
							themeType="tertiary"
						>
							Test Completed
						</Button>
					) : null}

					{!test_completed && viewType !== 'preview' ? (
						<Button
							type="button"
							onClick={onClickVisitTest}
						>
							Visit Test
						</Button>
					) : null}
				</div>
			</div>
		</div>
	);
}

export default TestComponent;
