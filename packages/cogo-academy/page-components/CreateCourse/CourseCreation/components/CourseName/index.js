import { Toast, Input, Button } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';

import styles from './styles.module.css';

function CourseName({
	setCourseData,
	setActiveStepper,
	courseData,
	setErrors,
	errors,
}) {
	const handleSaveCourseName = () => {
		if (isEmpty(courseData.course_name)) {
			Toast.error('Please enter course name');
			setErrors((prev) => ({ ...prev, course_name: 'This is Required' }));
		} else {
			setActiveStepper('course_topics');
		}
	};

	return (
		<div className={styles.container}>
			<div className={styles.title}>Pick a Name for your Course</div>

			<div className={styles.tag_line}>
				Don’t worry, you can change that later. We just need a name for creation
			</div>

			<div className={styles.input_container}>
				<Input
					value={courseData.course_name}
					onChange={(value) => setCourseData((prev) => ({ ...prev, course_name: value }))}
					size="md"
					placeholder="Type name..."
				/>
				{errors?.course_name && isEmpty(courseData.course_name) ? (
					<div className={styles.error_message}>
						**This is Required
					</div>
				) : null}
			</div>

			<div className={styles.footer}>
				<Button
					type="button"
					onClick={handleSaveCourseName}
					size="md"
					themeType="accent"
				>
					Continue
				</Button>
			</div>
		</div>
	);
}

export default CourseName;