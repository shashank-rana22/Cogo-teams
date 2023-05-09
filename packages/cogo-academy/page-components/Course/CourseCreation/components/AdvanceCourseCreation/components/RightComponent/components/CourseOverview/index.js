import styles from './styles.module.css';

function CourseOverview() {
	return (
		<div className={styles.container}>
			<div className={styles.main_content}>
				<div className={styles.left}>
					<span className={styles.strong_content}>
						The Course are divided as Modules within which are Sub Modules.
					</span>
					{' '}
					A course may have multiple Modules within which can lie many Sub modules.
					<br />
					<div className={styles.main_bottom_content}>
						Each course will be graded on the Basis of the
						{' '}
						<span className={styles.strong_content}>Course Completion criteria.</span>
					</div>
				</div>
				<div className={styles.right}>
					<div className={styles.right_courses}>
						Courses
						<div className={styles.right_module}>
							Modules
							<div className={styles.right_submodule}>
								Sub Modules
							</div>
						</div>
					</div>

				</div>
				<div className={styles.right_vector_group}>
					<div className={styles.right_vector} />
					<div className={styles.right_vector_dot} />
				</div>
			</div>

			<div className={styles.right_text}>
				<div className={styles.right_title}>
					Contain Course Content
				</div>
				<div className={styles.right_content}>
					(Document, Video, Presentation, Text,
					<br />
					{' '}
					Jupyter Code, Assessment)
				</div>
			</div>
			<div className={styles.footer_content}>
				<div className={styles.footer_top}>
					<div className={styles.footer_title}>Module:</div>
					<div className={styles.footer_content}>
						Introduce each Module by describing the Module s goals and importance.
						Give Sub Modules and Module titles that reflect their content and have a logical flow.
						You could design your course such that there is an Assessment at the end of each one.
					</div>
				</div>
				<div className={styles.footer_bottom}>
					<div className={styles.footer_title}>Sub Module:</div>
					<div className={styles.footer_content}>
						Each sub module covers one concept with one Content type.
						If there is a topic which requires multiple Content types,
						consider making it a course and breaking the concepts into Sub Modules.
					</div>
				</div>
			</div>
		</div>
	);
}

export default CourseOverview;
