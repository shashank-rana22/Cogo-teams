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
					<strong>
						There is a timed test you need to Pass in order to complete this
						course.
					</strong>
					&nbsp; It has been designed specifically to gauge your learnings
					from the course.
				</div>

				<div className={styles.test_details}>
					<div className={styles.data_box}>
						<div className={styles.data_display}>
							<span>No of Questions</span>
							<strong>{total_questions}</strong>
						</div>

						<div className={styles.data_display}>
							<span>Duration</span>
							<strong>
								<FormatTime test_duration={test_duration} />
							</strong>
						</div>

						<div className={styles.data_display}>
							<span>Attempts</span>
							<strong>{maximum_attempts}</strong>
						</div>

						<div className={styles.data_display}>
							<span>Required Pass %</span>
							<strong>{cut_off_percentage}</strong>
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
