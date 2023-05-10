import { MultiSelect, Button } from '@cogoport/components';

import styles from './styles.module.css';

const options = [
	{ label: 'Harper Lee', value: 'To Kill a Mockingbird' },
	{ label: 'Lev Tolstoy', value: 'War and Peace' },
];

function CourseTopics({
	setActiveStepper,
	courseData,
	setCourseData,
}) {
	const handlePreviousState = () => {
		setActiveStepper('course_name');
	};

	return (
		<div className={styles.container}>
			<div className={styles.title}>Which Category does your Course belong to?</div>

			<div className={styles.tag_line}>
				This will help users find your course during Consumption
			</div>

			<div className={styles.input_container}>
				<MultiSelect
					value={courseData.course_topics}
					placeholder="Select topics"
					options={options}
					isClearable
					onChange={(value) => setCourseData((prev) => ({ ...prev, course_topics: value }))}
				/>
			</div>

			<div className={styles.footer}>
				<div className={styles.prev_button}>
					<Button
						type="button"
						onClick={handlePreviousState}
						size="md"
						themeType="secondary"
					>
						Previous

					</Button>
				</div>

				<div className={styles.create_button}>
					<Button type="button" size="md" themeType="primary">Create Course</Button>
				</div>
			</div>
		</div>
	);
}

export default CourseTopics;
