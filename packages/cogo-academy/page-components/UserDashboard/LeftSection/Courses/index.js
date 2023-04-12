import styles from './styles.module.css';

function Courses() {
	return (
		<div className={styles.container}>
			<div className={styles.heading}>
				Cogo Academy Courses
			</div>

			<div className={styles.content}>
				<div className={styles.coming_soon_heading}>
					COMING SOON
				</div>
				<div className={styles.description}>
					We are working on creating something awesome to help you learn,
					you will be notified when it is live and ready for use
				</div>
			</div>
		</div>
	);
}

export default Courses;
